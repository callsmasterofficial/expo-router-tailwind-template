import { View, Text } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleHamburgerToX } from "../redux/slices/HamburgerToXSlice";
import HamburgerFunctionBasedComp from "./HamburgerFunctionbasedComp";
const HamburgerToXButton = ({ navigation }) => {
  const { iconState } = useSelector((state) => state.hamburgerToX);
  const dispatch = useDispatch();
  return (
    <View>
      <HamburgerFunctionBasedComp
        active={iconState}
        color="#702963"
        onPress={() => {
          dispatch(toggleHamburgerToX(!iconState));
          iconState
            ? navigation.navigate("CategoriesStack")
            : navigation.navigate("HomeStack");
        }}
      />
    </View>
  );
};

export default HamburgerToXButton;
