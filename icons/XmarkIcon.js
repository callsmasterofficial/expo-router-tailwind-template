import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const XmarkIcon = ({ color, size }) => {
  return (
    <View>
      <Svg
        stroke={color}
        fill="none"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </Svg>
    </View>
  );
};

export default XmarkIcon;
