import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const LeftArrowIcon = ({ color, fill, size }) => {
  return (
    <View>
      <Svg
        stroke={color}
        fill={fill}
        strokeWidth={0}
        viewBox="0 0 24 24"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
      </Svg>
    </View>
  );
};

export default LeftArrowIcon;
