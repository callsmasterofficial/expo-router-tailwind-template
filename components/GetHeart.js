import { RFPercentage } from "react-native-responsive-fontsize";
import { useTheme } from "../constants/ThemeContext";
import { HeartIcon, HeartOutlineIcon } from "../icons";

const GetHeart = ({ findproduct }) => {
  const { colors } = useTheme();
  if (findproduct) {
    return (
      <HeartIcon
        size={RFPercentage(2.5)}
        color={colors.primary}
        fill={colors.primary}
      />
    );
  } else {
    return (
      <HeartOutlineIcon
        size={RFPercentage(2.5)}
        color={"#4b5563"}
        fill={"#4b5563"}
      />
    );
  }
};

export default GetHeart;
