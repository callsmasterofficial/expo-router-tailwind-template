import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LeftArrowIcon } from "../icons";
const GoBackHeader = ({ productName }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "white" }}>
      <View
        className="w-full border-b-[1.5px] border-gray-200 flex-row items-center bg-white"
        style={{ padding: RFPercentage(2) }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftArrowIcon
            color={"#702963"}
            fill={"#702963"}
            size={RFPercentage(3)}
          />
        </TouchableOpacity>
        <Text
          className="text-primaryLight ml-3 sano"
          style={{ fontSize: RFPercentage(1.8) }}
        >
          {productName}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default GoBackHeader;
