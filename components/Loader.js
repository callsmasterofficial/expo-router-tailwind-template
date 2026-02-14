import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

const Loader = () => {
  return (
    <View className="w-full h-full justify-center items-center absolute top-0 bg-purple-50">
      <Image
        source={require("../assets/logoPurple.png")}
        className="w-[40%] h-[20%]"
        resizeMode="contain"
        style={{ marginBottom: RFPercentage(1.5) }}
      />
      <ActivityIndicator size="small" color="#702963" />
    </View>
  );
};

export default Loader;
