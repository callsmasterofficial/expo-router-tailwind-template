import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
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
  useEffect(() => {
    if (
      goldDiscount &&
      silverDiscount &&
      Object.keys(goldDiscount).length > 0 &&
      Object.keys(silverDiscount).length > 0
    ) {
      getSse();
    }
  }, [goldDiscount, silverDiscount]);

  let compareobj = {};
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
  async function getSse() {
    const token = JSON.parse(await AsyncStorage.getItem(AUTH_TOKEN));
    fetchRate();
    const es = new EventSource(
      `${goldRateUrl?.goldApiRateEvent}?token=${encodeURIComponent(token)}`,
    );
    es.addEventListener("open", (event) => {
      console.log("event", event);
      // console.log("open sse Connection");
    });
    es.addEventListener("message", (event) => {
      const res = JSON.parse(event.data);
      let bid = res[0].Bid;
      let bid2 = res[1].Bid;
      dispatch(
        updateGoldRateTime({
          goldRate: res[0].Bid,
          silverRate: res[1].Bid,
          updateTime: res[0].Time,
        }),
      );
      dispatch(
        addGoldRate({ currentRate: res[0].Bid, discount: goldDiscount }),
      );
      dispatch(
        addSilverRate({ currentRate: res[1].Bid, discount: silverDiscount }),
      );
      checkBid();
      function checkBid() {
        if (compareobj.bid || compareobj.bid2) {
          if (bid > compareobj.bid || bid2 > compareobj.bid2) {
            dispatch(addGoldIncDec("green"));
            compareobj.bid = bid;
            compareobj.bid2 = bid2;
            let timer = setInterval(() => {
              dispatch(addGoldIncDec("white"));
              clearInterval(timer);
            }, 2000);
          }
          if (bid < compareobj.bid || bid2 < compareobj.bid2) {
            dispatch(addGoldIncDec("red"));
            compareobj.bid = bid;
            compareobj.bid2 = bid2;
            let timer = setInterval(() => {
              dispatch(addGoldIncDec("white"));
              clearInterval(timer);
            }, 2000);
          }
        } else {
          compareobj.bid = bid;
          compareobj.bid2 = bid2;
        }
      }
    });
    es.addEventListener("error", (event) => {
      if (event.type === "error") {
        console.error("Connection error:", event);
      } else if (event.type === "exception") {
        console.error("Error:", event.message, event.error);
      }
      console.log("error occured", event);
    });

    es.addEventListener("close", (event) => {
      console.log("Close SSE connection.");
    });
  }
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
