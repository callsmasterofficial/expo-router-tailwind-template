import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../constants/ThemeContext";
import { toggleHamburgerToX } from "../redux/slices/HamburgerToXSlice";
import HamburgerFunctionBasedComp from "./HamburgerFunctionbasedComp";
const HamburgerToXButton = ({ navigation }) => {
  const { iconState } = useSelector((state) => state.hamburgerToX);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  return (
    <View>
      <HamburgerFunctionBasedComp
        active={iconState}
        color={colors.primary}
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
