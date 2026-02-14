import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN } from "../constants/commonConstant";

const useFetchWithPagination = async ({
  url,
  dispatchFunction,
  isCategory = false,
  config,
}) => {
  //   const getToken = async () => {
  //     const { token } = JSON.parse(await AsyncStorage.getItem("USER"));
  //     return token;
  //   };
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
        dispatch(dispatchFunction({ data, config }));
      } catch (error) {
        console.log(
          "Sorry there's some error occured while fetching data",
          error
        );
      }
    })();
  }, [url]);
};
export default useFetchWithPagination;
