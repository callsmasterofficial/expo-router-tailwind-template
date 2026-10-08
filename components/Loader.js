import React from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useTheme } from "../constants/ThemeContext";

const Loader = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        backgroundColor: colors.background,
      }}
    >
      <Image
        source={require("../assets/logoMaroon.png")}
        style={{ width: "60%", height: "30%", marginBottom: RFPercentage(1.5) }}
        resizeMode="contain"
      />
      <ActivityIndicator size="small" color={colors.primary} />
    </View>
  );
};

export default Loader;
