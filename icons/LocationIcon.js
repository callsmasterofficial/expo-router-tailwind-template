import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
const LocationIcon = ({ color, fill, size }) => {
  return (
    <View>
      <Svg
        stroke={color}
        fill={fill}
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
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </Svg>
    </View>
  );
};

export default LocationIcon;
