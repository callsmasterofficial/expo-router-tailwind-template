import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, StatusBar, TouchableOpacity, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../constants/ThemeContext";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import { sendWhatsApp } from "../utilities/whatsAppFn";

const NavBar = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={{ backgroundColor: colors.surface }}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.surface}
      />
      <SafeAreaView edges={["top"]}>
        <View
          style={{
            borderBottomWidth: 1.5,
            borderBottomColor: colors.border,
            backgroundColor: colors.surface,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: RFPercentage(2),
          }}
        >
          <TouchableOpacity onPress={handleMenuPress}>
            <MaterialIcons name="menu" size={28} color={colors.primary} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Image
              source={
                isDark
                  ? require("../assets/logoGold.png")
                  : require("../assets/logoMaroon.png")
              }
              style={{ width: "100%", height: RFPercentage(8) }}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity onPress={() => sendWhatsApp(9211404040)}>
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 999,
                padding: 10,
              }}
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
