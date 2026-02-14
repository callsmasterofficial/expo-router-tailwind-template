import { Drawer } from "expo-router/drawer";
import { Provider } from "react-redux";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { store } from "../redux/store/Store";
import "./global.css";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Drawer
        screenOptions={{
          headerShown: false,
          // drawerActiveTintColor: "white",
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
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
    </Provider>
  );
}
