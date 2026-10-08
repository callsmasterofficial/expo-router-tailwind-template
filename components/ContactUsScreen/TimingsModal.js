import { Modal, Text, TouchableOpacity, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useTheme } from "../../constants/ThemeContext";
import { CircularCrossIcon } from "../../icons";

const TimingsModal = ({
  openTimingsModal,
  setOpenTimingsModal,
  timingTable,
}) => {
  const { colors } = useTheme();
  return (
    <Modal visible={openTimingsModal} animationType="slide" transparent={true}>
      <View
        className="w-full bottom-0 absolute rounded-t-3xl"
        style={{ backgroundColor: colors.surface }}
      >
        <View
          className="rounded-t-3xl flex-row justify-between items-center"
          style={{
            backgroundColor: colors.surfaceAlt,
            padding: RFPercentage(2),
          }}
        >
          <Text
            className="font-semibold"
            style={{ fontSize: RFPercentage(1.5), color: colors.primary }}
          >
            Store Timings
          </Text>
          <TouchableOpacity onPress={() => setOpenTimingsModal(false)}>
            <CircularCrossIcon
              color={colors.primary}
              fill={colors.primary}
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
                className="text-primaryLight text-[#D4AF37] font-semibold"
                style={{ fontSize: RFPercentage(1.5) }}
              >
                {item.label}
              </Text>
              <Text style={{ fontSize: RFPercentage(1.5), color: colors.text }}>
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
