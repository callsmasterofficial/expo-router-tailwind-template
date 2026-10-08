import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import EventSource from "react-native-sse";
import { useDispatch, useSelector } from "react-redux";
import InstagramFeed from "../components/HomeScreen/InstagramFeed";
import LiveGoldRateHeader from "../components/HomeScreen/LiveGoldRateHeader";
import SliderHomeScreen from "../components/HomeScreen/SliderHomeScreen";
import TagWiseProducts from "../components/HomeScreen/TagWiseProducts";
import WhyBuyFromUs from "../components/HomeScreen/WhyBuyFromUs";
import Loader from "../components/Loader";
import Navbar from "../components/NavBar";
import { AUTH_TOKEN } from "../constants/commonConstant";
import useFetch from "../customHooks/useFetch";
import { usePushNotifications } from "../customHooks/usePushNotifications";
import { addCategories } from "../redux/slices/CategoriesSlice";
import { addGoldDiscount } from "../redux/slices/GoldDiscountSlice";
import { addGoldIncDec, addGoldRate } from "../redux/slices/GoldRateSlice";
import { updateGoldRateTime } from "../redux/slices/GoldRateTimeSlice";
import { addSilverDiscount } from "../redux/slices/SilverDiscountSlice";
import { addSilverRate } from "../redux/slices/SilverRateSlice";
import { alreadyWishlisted } from "../redux/slices/WishlistSlice";

const HomeScreen = () => {
  usePushNotifications();

  // (async () => {
  //   await AsyncStorage.removeItem(AUTH_TOKEN);
  // })();
  const [goldRateUrl, setGoldRateUrl] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://callsmaster-assets-cdn.s3.ap-south-1.amazonaws.com/app-configuration-assets/urmilJewellers.json",
      );
      const data = await response.json();
      setGoldRateUrl(data);
    })();
  }, []);

  const [tokenStatus, setTokenStatus] = useState(null);
  // fetching Gold Rates
  const dispatch = useDispatch();
  useFetch(
    "https://gold.accessdashboard.live/api/app/component/gold-rate-modify",
    addGoldDiscount,
    tokenStatus,
  );
  useFetch(
    "https://gold.accessdashboard.live/api/app/component/silver-rate-modify",
    addSilverDiscount,
    tokenStatus,
  );
  const goldDiscount = useSelector(
    (state) => state.goldDiscountRate.discountRate,
  );
  const silverDiscount = useSelector(
    (state) => state.silverDiscountRate.discountRate,
  );
  // Removed defective useEffect and compareobj logic

  const fetchRate = async () => {
    try {
      const data = await fetch(goldRateUrl?.goldApiRate);
      const res = await data.json();
      if (res && res[0] && res[1]) {
        dispatch(
          updateGoldRateTime({
            goldRate: res[0].Bid || res[0].bid || 0,
            silverRate: res[1].Bid || res[1].bid || 0,
            updateTime: res[0].Time || new Date().toISOString(),
          }),
        );
        dispatch(
          addGoldRate({
            currentRate: res[0].Bid || res[0].bid || 0,
            discount: goldDiscount,
          }),
        );
        dispatch(
          addSilverRate({
            currentRate: res[1].Bid || res[1].bid || 0,
            discount: silverDiscount,
          }),
        );
      }
    } catch (err) {
      console.error("fetchRate error:", err);
    }
  };
  const previousBids = useRef({ bid: null, bid2: null });
  const timerRef = useRef(null);

  useEffect(() => {
    let es = null;
    let active = true;

    const initSse = async () => {
      // Ensure we have all necessary data before connecting
      if (
        !goldDiscount ||
        !silverDiscount ||
        !goldRateUrl?.goldApiRateEvent ||
        Object.keys(goldDiscount).length === 0 ||
        Object.keys(silverDiscount).length === 0
      ) {
        return;
      }

      try {
        const tokenStr = await AsyncStorage.getItem(AUTH_TOKEN);
        console.log("tokenStr", tokenStr);
        if (!tokenStr) return;
        const token = JSON.parse(tokenStr);

        if (!active) return;

        // Perform initial fetch
        fetchRate();

        const url = `${goldRateUrl.goldApiRateEvent}?token=${encodeURIComponent(token)}`;
        console.log("Connecting to SSE:", url);

        es = new EventSource(url);

        es.addEventListener("open", (event) => {
          console.log("SSE Connection Opened");
        });

        es.addEventListener("message", (event) => {
          if (!active) return;
          try {
            const res = JSON.parse(event.data);
            if (!res || !res[0] || !res[1]) return;

            const bid = res[0].Bid || res[0].bid || 0;
            const bid2 = res[1].Bid || res[1].bid || 0;

            dispatch(
              updateGoldRateTime({
                goldRate: bid,
                silverRate: bid2,
                updateTime: res[0].Time,
              }),
            );
            dispatch(addGoldRate({ currentRate: bid, discount: goldDiscount }));
            dispatch(
              addSilverRate({ currentRate: bid2, discount: silverDiscount }),
            );

            // Check Bid Logic for visual indicators
            const prev = previousBids.current;

            if (prev.bid !== null && prev.bid2 !== null) {
              let color = null;
              if (bid > prev.bid || bid2 > prev.bid2) {
                color = "green";
              } else if (bid < prev.bid || bid2 < prev.bid2) {
                color = "red";
              }

              if (color) {
                dispatch(addGoldIncDec(color));

                // Clear existing timer to prevent interfering resets
                if (timerRef.current) clearTimeout(timerRef.current);

                timerRef.current = setTimeout(() => {
                  if (active) dispatch(addGoldIncDec("white"));
                }, 2000);
              }
            }

            // Update refs
            previousBids.current = { bid, bid2 };
          } catch (err) {
            console.error("Error parsing SSE message", err);
          }
        });

        es.addEventListener("error", (event) => {
          // Log error but avoid excessive spam if possible
          console.log("SSE Error event:", event);
        });
      } catch (e) {
        console.error("Error initializing SSE", e);
      }
    };

    initSse();

    return () => {
      active = false;
      if (es) {
        es.close();
        console.log("SSE Connection Closed");
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [goldDiscount, silverDiscount, goldRateUrl]);
  ////////////////////

  // Getting Token for each user
  useEffect(() => {
    (async () => {
      try {
        const token = JSON.parse(await AsyncStorage.getItem(AUTH_TOKEN));
        if (!token) {
          const fetchToken = await fetch(
            "https://gold.accessdashboard.live/api/app/get-token?app=65c5f6aaaea19b166aacc7dd",
            { method: "POST" },
          );
          const { token } = await fetchToken.json();
          await AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
          setTokenStatus(1);
        } else {
          setTokenStatus(2);
        }
        //wishlistProducts
        (async () => {
          try {
            const wishlistProducts =
              JSON.parse(
                await AsyncStorage.getItem("storageShortlistProducts"),
              ) === null
                ? []
                : JSON.parse(
                    await AsyncStorage.getItem("storageShortlistProducts"),
                  );
            dispatch(alreadyWishlisted(wishlistProducts));
          } catch (err) {
            console.log("error fetching wishlist Products", err);
          }
        })();
      } catch (e) {
        console.log("error", e);
      }
    })();
  }, [tokenStatus]);
  ///////////////////
  // fetching home page catalogue images
  useFetch(
    "https://gold.accessdashboard.live/api/app/all-categories",
    addCategories,
    tokenStatus,
  );
  const cats = useSelector((state) => state?.categories[0]);
  console.log({ cats });
  const tags = cats?.map((item) => item.tags[0]);
  const tagsArr = Array.from(new Set(tags));
  //////////////////
  return (
    <>
      <Navbar />
      {tagsArr?.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <>
              <LiveGoldRateHeader />
              <SliderHomeScreen />
              <InstagramFeed />
            </>
          )}
          data={tagsArr}
          renderItem={({ item }) => (
            <TagWiseProducts tagName={item} cats={cats} />
          )}
          ListFooterComponent={() => <WhyBuyFromUs />}
        />
      )}
      {tagsArr.length === 0 && <Loader />}
    </>
  );
};

export default HomeScreen;
