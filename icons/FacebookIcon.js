import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const FacebookIcon = ({ color, fill, size }) => {
  return (
    <View>
      <Svg
        stroke={color}
        fill={fill}
        strokeWidth={0}
        viewBox="0 0 320 512"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
      </Svg>
    </View>
  );
};

export default FacebookIcon;
