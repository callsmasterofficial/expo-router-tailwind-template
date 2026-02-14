import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
const HomeIcon = ({ color, fill, size }) => {
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
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </Svg>
    </View>
  );
};

export default HomeIcon;
