import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN } from "../constants/commonConstant";

const useFetchTags = async (url, dispatchFunction, tagName, tokenStatus) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const token = JSON.parse(
          (await AsyncStorage.getItem(AUTH_TOKEN)) || {}
        );
        const raw = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await raw.json();
        dispatch(dispatchFunction({ tagName, data }));
      } catch (error) {
        console.log("Sorry there has been an error while fetching data", error);
      }
    })();
  }, [url, tokenStatus]);
};
export default useFetchTags;
