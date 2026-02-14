import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

export default function ClockIcon({ color, fill, size }) {
  return (
    <View>
      <Svg
        stroke={color}
        fill={fill}
        strokeWidth={0}
        viewBox="0 0 16 16"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
      </Svg>
    </View>
  );
}
