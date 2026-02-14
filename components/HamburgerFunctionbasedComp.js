import React, { useState, useEffect, useRef } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";

const HamburgerFunctionBasedComp = ({
  active: propActive,
  onPress,
  color = "black",
  type,
}) => {
  const [active, setActive] = useState(propActive);
  // Refs for animations
  const containerAnim = useRef(new Animated.Value(0)).current;
  const topBar = useRef(new Animated.Value(0)).current;
  const bottomBar = useRef(new Animated.Value(0)).current;
  const middleBarOpacity = useRef(new Animated.Value(1)).current;
  const bottomBarMargin = useRef(new Animated.Value(4)).current;
  const topBarMargin = useRef(new Animated.Value(0)).current;
  const marginLeft = useRef(new Animated.Value(0)).current;
  const width = useRef(new Animated.Value(25)).current;
  const animate = (toChange) => {
    toChange && setActive(!active); // Toggle active state

    // Define the animation based on the type
    let animations = [];

    // spinCross or cross
    animations = [
      Animated.spring(topBar, {
        toValue: propActive ? 0 : 0.9,
        useNativeDriver: false,
      }),
      Animated.spring(bottomBar, {
        toValue: propActive ? 0 : 0.9,
        useNativeDriver: false,
      }),
      Animated.spring(bottomBarMargin, {
        toValue: propActive ? 4 : -10,
        useNativeDriver: false,
      }),
      Animated.spring(middleBarOpacity, {
        toValue: propActive ? 1 : 0,
        duration: type === "spinCross" ? 30 : 1200,
        useNativeDriver: false,
      }),
    ];

    // Start the animations
    Animated.parallel(animations).start();
  };

  useEffect(() => {
    setActive(propActive);
    animate();
  }, [propActive]);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress && onPress();
        animate(true);
      }}
    >
      <Animated.View
        style={{
          width: 35,
          justifyContent: "center",
          alignItems: "center",
          height: 35,
          transform: [
            {
              rotate: containerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
        }}
      >
        <Animated.View
          style={{
            height: 3,
            marginLeft,
            width,
            marginBottom: topBarMargin,
            backgroundColor: color,
            transform: [
              {
                rotate: topBar.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "-50deg"],
                }),
              },
            ],
          }}
        />
        <Animated.View
          style={{
            height: 3,
            width: 25,
            opacity: middleBarOpacity,
            backgroundColor: color,
            marginTop: 4,
          }}
        />
        <Animated.View
          style={{
            height: 3,
            marginLeft,
            width,
            backgroundColor: color,
            marginTop: bottomBarMargin,
            transform: [
              {
                rotate: bottomBar.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "50deg"],
                }),
              },
            ],
          }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default HamburgerFunctionBasedComp;
