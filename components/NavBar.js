import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, StatusBar, TouchableOpacity, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import { sendWhatsApp } from "../utilities/whatsAppFn";

const NavBar = () => {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View className="bg-white">
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView edges={["top"]}>
        <View
          className="border-b-[1.5px] bg-white border-gray-200 flex-row items-center justify-between"
          style={{ padding: RFPercentage(2) }}
        >
          <TouchableOpacity onPress={handleMenuPress}>
            <MaterialIcons name="menu" size={28} color="#702963" />
          </TouchableOpacity>
          <View className="flex-grow">
            <Image
              source={require("../assets/urmilHeadingPurple.png")}
              className="w-full"
              style={{ height: RFPercentage(3) }}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity onPress={() => sendWhatsApp(7490077006)}>
            <View
              className="bg-primaryLight rounded-full"
              style={{ padding: 10 }}
            >
              <WhatsAppIcon size={18} color={"white"} fill={"white"} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default NavBar;
