import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CategoriesTopTabs } from "../screens/Categories/CategoriesScreen";
const CategoriesStackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen
        name="Categories"
        component={CategoriesTopTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CategoriesStackNavigator;
