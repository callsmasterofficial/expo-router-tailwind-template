import { Feather, Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MAROON = "#5B1433"; // close to screenshot

export default function CustomDrawerContent(props) {
  const insets = useSafeAreaInsets();
  const [jewelleryOpen, setJewelleryOpen] = useState(false);

  const pathname = usePathname();

  const go = (path) => {
    router.push(path);
    props.navigation.closeDrawer();
  };

  const toggleJewellery = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setJewelleryOpen((p) => !p);
  };

  const Item = ({
    label,
    route,
    icon,
    activeBg = MAROON,
    activeColor = "#fff",
  }) => {
    const active = pathname === route;

    return (
      <Pressable
        onPress={() => go(route)}
        style={[styles.item, active && { backgroundColor: activeBg }]}
      >
        <View style={styles.iconWrap}>
          {icon({ color: active ? "#fff" : "#111", size: 22 })}
        </View>
        <Text style={[styles.label, active && { color: activeColor }]}>
          {label}
        </Text>
      </Pressable>
    );
  };

  const [openCat, setOpenCat] = useState({
    gold: false,
    diamond: false,
    silver: false,
  });


  const cats = useSelector((state) => state?.categories[0]);

  const TAGS_ORDER = ["gold", "diamond", "silver"];
  const TAG_LABEL = { gold: "Gold", diamond: "Diamond", silver: "Silver" };

  const groupedCats = useMemo(() => {
    const list = Array.isArray(cats) ? cats : [];
    return TAGS_ORDER.reduce((acc, tag) => {
      acc[tag] = list.filter((c) => (c?.tags || []).includes(tag));
      return acc;
    }, {});
  }, [cats]);

  const toggleCat = (tag) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenCat((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.container}
      >
        {/* TOP LOGO AREA */}
        <View style={styles.logoWrap}>
          {/* Replace with your own logo */}
          <Image
            source={{
              uri: "https://dummyimage.com/600x300/ffffff/000000&text=RIGHT+GOLD",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* MENU */}
        <View style={styles.menu}>
          <Item
            label="Live Rate"
            route="/"
            icon={({ color, size }) => (
              <Feather name="bar-chart-2" color={color} size={size} />
            )}
          />

          {/* JEWELLERY DROPDOWN */}
          <Pressable
            onPress={toggleJewellery}
            style={[
              styles.item,
              pathname?.startsWith("/category") && {
                backgroundColor: MAROON,
              },
            ]}
          >
            <View style={styles.iconWrap}>
              <Ionicons
                name="diamond-outline"
                size={22}
                color={
                  pathname?.startsWith("/category") ? "#fff" : "#111"
                }
              />
            </View>

            <Text
              style={[
                styles.label,
                pathname?.startsWith("/category") && { color: "#fff" },
              ]}
            >
              Jewellery
            </Text>

            <Ionicons
              name={jewelleryOpen ? "chevron-up" : "chevron-down"}
              size={20}
              color={
                pathname?.startsWith("/category") ? "#fff" : "#111"
              }
              style={{ marginLeft: "auto" }}
            />
          </Pressable>

          {jewelleryOpen && (
            <View style={styles.subMenu}>
              {TAGS_ORDER.map((tag) => {
                const items = groupedCats[tag] || [];
                if (!items.length) return null; // hide tag if no items

                const isOpen = !!openCat[tag];

                return (
                  <View key={tag}>
                    {/* TAG ROW (Gold/Diamond/Silver) */}
                    <Pressable onPress={() => toggleCat(tag)} style={styles.catRow}>
                      <Text style={styles.catLabel}>{TAG_LABEL[tag]}</Text>
                      <Ionicons
                        name={isOpen ? "remove" : "add"}
                        size={20}
                        color="#111"
                      />
                    </Pressable>

                    {/* SUB CATEGORIES */}
                    {isOpen && (
                      <View style={styles.subCatWrap}>
                        {items.map((c) => (
                          <Pressable
                            key={c._id}
                            onPress={() => go(`/category/${c._id}`)}
                            style={styles.subItem}
                          >
                            <Text style={styles.subLabel}>
                              {c.name}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}

          <Item
            label="Wishlist"
            route="/wishlist"
            icon={({ color, size }) => (
              <Ionicons name="heart-outline" color={color} size={size} />
            )}
          />

          <Item
            label="Bill Yourself Calculator"
            route="/calculator"
            icon={({ color, size }) => (
              <Ionicons name="calculator-outline" color={color} size={size} />
            )}
          />

          <Item
            label="Updates"
            route="/Updates"
            icon={({ color, size }) => (
              <Ionicons name="newspaper-outline" color={color} size={size} />
            )}
          />

          <Item
            label="Bank Detail"
            route="/BankDetail"
            icon={({ color, size }) => (
              <Ionicons name="business-outline" color={color} size={size} />
            )}
          />

          <Item
            label="Economic Calendar"
            route="/EconomicCalendar"
            icon={({ color, size }) => (
              <Ionicons name="calendar-outline" color={color} size={size} />
            )}
          />

          <Item
            label="Location"
            route="/Location"
            icon={({ color, size }) => (
              <Ionicons name="location-outline" color={color} size={size} />
            )}
          />

          <Item
            label="Share"
            route="/Share"
            icon={({ color, size }) => (
              <Ionicons name="share-social-outline" color={color} size={size} />
            )}
          />

          <Item
            label="Rate Our App"
            route="/RateApp"
            icon={({ color, size }) => (
              <Ionicons name="star-outline" color={color} size={size} />
            )}
          />

          <Item
            label="Contact Us"
            route="/contact-us"
            icon={({ color, size }) => (
              <Ionicons name="call-outline" color={color} size={size} />
            )}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingBottom: 18,
  },
  logoWrap: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.12)",
  },
  logo: {
    width: "100%",
    height: 120,
  },
  menu: {
    paddingTop: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  iconWrap: {
    width: 40,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  subMenu: {
    paddingLeft: 54,
    paddingBottom: 6,
  },
  subItem: {
    paddingVertical: 10,
  },
  subLabel: {
    fontSize: 16,
    color: "#111",
    opacity: 0.85,
    fontWeight: "500",
  },
  catRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingRight: 14,
  },

  catLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  subCatWrap: {
    paddingLeft: 14,
    paddingBottom: 6,
    borderLeftWidth: 2,
    borderLeftColor: "rgba(0,0,0,0.10)",
    marginLeft: 4,
  },
});
