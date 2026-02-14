import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { CircularCrossIcon } from "../../icons";

const TimingsModal = ({
  openTimingsModal,
  setOpenTimingsModal,
  timingTable,
}) => {
  return (
    <Modal visible={openTimingsModal} animationType="slide" transparent={true}>
      <View className="bg-white w-full bottom-0 absolute rounded-t-3xl">
        <View
          className="rounded-t-3xl flex-row justify-between items-center bg-purple-50"
          style={{
            padding: RFPercentage(2),
          }}
        >
          <Text
            className="text-primaryLight font-semibold"
            style={{ fontSize: RFPercentage(1.5) }}
          >
            Store Timings
          </Text>
          <TouchableOpacity onPress={() => setOpenTimingsModal(false)}>
            <CircularCrossIcon
              color="#702963"
              fill="#702963"
              size={RFPercentage(2)}
            />
          </TouchableOpacity>
        </View>
        <View style={{ padding: RFPercentage(2) }}>
          {timingTable.map((item, index) => (
            <View
              className={`flex-row items-center justify-between ${
                item.label !== "Total Price" && "border-b-[1px]"
              } border-primaryLight/20`}
              key={index}
              style={{ padding: RFPercentage(1) }}
            >
              <Text
                className="text-primaryLight font-semibold"
                style={{ fontSize: RFPercentage(1.5) }}
              >
                {item.label}
              </Text>
              <Text
                className="text-gray-600"
                style={{ fontSize: RFPercentage(1.5) }}
              >
                {item.detail}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default TimingsModal;
