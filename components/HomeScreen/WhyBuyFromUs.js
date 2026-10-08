import React, { useState } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useTheme } from "../../constants/ThemeContext";
import whyBuyData from "../../constants/whyBuyData";
import { ChevronDownIcon } from "../../icons";

const WhyBuyFromUs = () => {
  const { colors } = useTheme();
  const [toggleFaq, setToggleFaq] = useState("");
  return (
    <View
      style={{
        marginTop: RFPercentage(2),
        marginBottom: RFPercentage(7),
        paddingHorizontal: RFPercentage(1.5),
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          fontSize: RFPercentage(2),
          marginBottom: RFPercentage(1.5),
          fontWeight: "bold",
          color: colors.accent,
          textTransform: "uppercase",
        }}
      >
        Why Urmil Jewellers
      </Text>
      {whyBuyData.map((item, index) => (
        <View key={index}>
          <TouchableWithoutFeedback
            onPress={() =>
              toggleFaq === index ? setToggleFaq("") : setToggleFaq(index)
            }
          >
            <View
              style={{
                width: "100%",
                borderRadius: 16,
                backgroundColor: colors.surface,
                flexDirection: "row",
                alignItems: "center",
                padding: RFPercentage(1.5),
                marginBottom: RFPercentage(1),
                shadowColor: colors.cardShadow,
                shadowOpacity: 1,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <View
                style={{
                  padding: RFPercentage(1.5),
                  backgroundColor: colors.primary,
                  borderRadius: 999,
                }}
              >
                {item?.icon}
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: "600",
                    fontSize: RFPercentage(1.8),
                    marginLeft: RFPercentage(1),
                  }}
                >
                  {item.title}
                </Text>
              </View>
              <View
                style={{
                  transform: toggleFaq === index ? [{ rotate: "180deg" }] : [],
                }}
              >
                <ChevronDownIcon
                  size={RFPercentage(2)}
                  color={colors.primary}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          {toggleFaq === index && (
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 16,
                padding: RFPercentage(1.5),
                marginBottom: RFPercentage(1),
                shadowColor: colors.cardShadow,
                shadowOpacity: 1,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: RFPercentage(1.5),
                  lineHeight: RFPercentage(2),
                }}
              >
                {item.text}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default WhyBuyFromUs;
