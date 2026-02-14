import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function shortlistFunction(shortlistArray) {
  try {
    await AsyncStorage.setItem(
      "storageShortlistProducts",
      JSON.stringify(shortlistArray)
    );
  } catch (e) {
    console.log(
      "error occured while storing shortlist products in the async storage",
      e
    );
  }
}
