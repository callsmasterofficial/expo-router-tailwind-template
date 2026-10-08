import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { db } from "../config/firebaseConfig";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // WAS: token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    // We can let it infer from app.json if correctly configured, or pass it explicitly.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        console.log("Project ID not found in Constants");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: projectId,
        })
      ).data;
    } catch (e) {
      console.log("Error getting push token", e);
    }
  } else {
    console.log("Must use physical device for Push Notifications");
  }

  return token;
}

export const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      setExpoPushToken(token);
      if (token) {
        // Save token to Firestore
        try {
          await setDoc(
            doc(db, "users", token),
            {
              expoPushToken: token,
              updatedAt: new Date(),
              deviceType: Platform.OS,
            },
            { merge: true },
          );
          console.log("Token saved to Firestore:", token);
        } catch (e) {
          console.error("Error saving token to Firestore:", e);
        }
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current && notificationListener.current.remove();
      responseListener.current && responseListener.current.remove();
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};
