import { View, Text } from "react-native";
import React from "react";
import { HeartIcon, HeartOutlineIcon } from "../icons";
import { RFPercentage } from "react-native-responsive-fontsize";

const GetHeart = ({ findproduct }) => {
  if (findproduct) {
    return (
      <HeartIcon size={RFPercentage(2.5)} color={"#702963"} fill={"#702963"} />
    );
  } else {
    return (
      <HeartOutlineIcon
        size={RFPercentage(2.5)}
        color={"#4b5563"}
        fill={"#4b5563"}
      />
    );
  }
};

export default GetHeart;
