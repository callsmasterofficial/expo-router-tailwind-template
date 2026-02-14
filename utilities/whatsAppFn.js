import { Linking, Platform, ToastAndroid } from "react-native";
export const sendWhatsApp = (number) => {
  let msg = "How can i get Better Deals?";
  let phoneWithCountryCode = number;
  let mobile =
    Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
  if (mobile) {
    if (msg) {
      let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
      Linking.openURL(url)
        .then((data) => {
          console.log("WhatsApp Opened");
        })
        .catch(() => {
          Platform.OS === "android"
            ? ToastAndroid.show(
                "Make sure WhatsApp installed on your device",
                ToastAndroid.LONG
              )
            : alert("Make sure WhatsApp installed on your device");
        });
    } else {
      alert("Please insert message to send");
    }
  } else {
    alert("Please insert mobile no");
  }
};
