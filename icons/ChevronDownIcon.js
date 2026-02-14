import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
const ChevronDownIcon = ({ color, fill, size }) => {
  return (
    <View>
      <Svg
        stroke={color}
        fill={"transparent"}
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <Path d="M6 9l6 6l6 -6" />
      </Svg>
    </View>
  );
};

export default ChevronDownIcon;
