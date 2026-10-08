import { useNavigation } from "@react-navigation/core";
import { Text, TouchableOpacity, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../constants/ThemeContext";
import { LeftArrowIcon } from "../icons";

const GoBackHeader = ({ productName }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: colors.surface }}>
      <View
        style={{
          width: "100%",
          borderBottomWidth: 1.5,
          borderBottomColor: colors.border,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.surface,
          padding: RFPercentage(2),
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftArrowIcon
            color={colors.primary}
            fill={colors.primary}
            size={RFPercentage(3)}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.accent,
            marginLeft: 12,
            fontSize: RFPercentage(1.8),
          }}
        >
          {productName}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default GoBackHeader;
