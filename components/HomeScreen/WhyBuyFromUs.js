import { View, Text, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import whyBuyData from "../../constants/whyBuyData";
import { ChevronDownIcon, DiamondIcon } from "../../icons";

const WhyBuyFromUs = () => {
  const [toggleFaq, setToggleFaq] = useState("");
  return (
    <View
      style={{
        marginTop: RFPercentage(2),
        marginBottom: RFPercentage(7),
        paddingHorizontal: RFPercentage(1.5),
      }}
    >
      <Text
        style={{ fontSize: RFPercentage(2), marginBottom: RFPercentage(1.5) }}
        className="font-bold text-primaryLight uppercase"
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
              className="w-full rounded-2xl bg-white flex-row items-center"
              style={{
                padding: RFPercentage(1.5),
                marginBottom: RFPercentage(1),
                shadowColor: "black",
                shadowOpacity: 0.26,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <View
                style={{ padding: RFPercentage(1.5) }}
                className="bg-primaryLight rounded-full"
              >
                {item?.icon}
              </View>
              <View className="flex-grow">
                <Text
                  className="text-text font-semibold"
                  style={{
                    fontSize: RFPercentage(1.8),
                    marginLeft: RFPercentage(1),
                  }}
                >
                  {item.title}
                </Text>
              </View>
              <View className={`${toggleFaq === index && "rotate-180"}`}>
                <ChevronDownIcon size={RFPercentage(2)} color={"#702963"} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          {toggleFaq === index && (
            <View
              className="bg-white rounded-2xl"
              style={{
                padding: RFPercentage(1.5),
                marginBottom: RFPercentage(1),
                shadowColor: "black",
                shadowOpacity: 0.26,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <Text
                className="text-text"
                style={{
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
