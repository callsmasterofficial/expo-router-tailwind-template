import { Drawer } from "expo-router/drawer";
import { Provider } from "react-redux";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { ThemeProvider } from "../constants/ThemeContext";
import { store } from "../redux/store/Store";
import "./global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Drawer
          screenOptions={{
            headerShown: false,
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Home",
              title: "overview",
            }}
          />
          <Drawer.Screen
            name="calculator/index"
            options={{
              drawerLabel: "Calculator",
              title: "Calculator",
            }}
          />
          <Drawer.Screen
            name="category/[catId]"
            options={{
              drawerLabel: "category",
              title: "category",
            }}
          />
        </Drawer>
      </ThemeProvider>
    </Provider>
  );
}
