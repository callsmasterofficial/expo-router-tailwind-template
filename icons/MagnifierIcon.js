import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
const MagnifierIcon = ({ color, size, fill }) => {
  return (
    <View>
      <Svg
        stroke={color}
        fill={color}
        strokeWidth={0}
        viewBox="0 0 20 20"
        aria-hidden="true"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  );
};

export default MagnifierIcon;
