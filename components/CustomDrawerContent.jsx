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
    Switch,
    Text,
    UIManager,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useTheme } from "../constants/ThemeContext";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CustomDrawerContent(props) {
  const insets = useSafeAreaInsets();
  const [jewelleryOpen, setJewelleryOpen] = useState(false);
  const pathname = usePathname();
  const { colors, isDark, toggleTheme } = useTheme();

  const go = (path) => {
    router.push(path);
    props.navigation.closeDrawer();
  };

  const toggleJewellery = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setJewelleryOpen((p) => !p);
  };

  const Item = ({ label, route, icon }) => {
    const active = pathname === route;
    return (
      <Pressable
        onPress={() => go(route)}
        style={[
          styles.item,
          {
            backgroundColor: active ? colors.primary : "transparent",
          },
        ]}
      >
        <View style={styles.iconWrap}>
          {icon({ color: active ? "#fff" : colors.text, size: 22 })}
        </View>
        <Text style={[styles.label, { color: active ? "#fff" : colors.text }]}>
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
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.background,
      }}
    >
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
      >
        {/* TOP LOGO AREA */}
        <View
          style={[
            styles.logoWrap,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <Image
            source={
              isDark
                ? require("../assets/logoGold.png")
                : require("../assets/logoMaroon.png")
            }
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* MENU */}
        <View style={[styles.menu, { backgroundColor: colors.background }]}>
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
                backgroundColor: colors.primary,
              },
            ]}
          >
            <View style={styles.iconWrap}>
              <Ionicons
                name="diamond-outline"
                size={22}
                color={pathname?.startsWith("/category") ? "#fff" : colors.text}
              />
            </View>
            <Text
              style={[
                styles.label,
                {
                  color: pathname?.startsWith("/category")
                    ? "#fff"
                    : colors.text,
                },
              ]}
            >
              Jewellery
            </Text>
            <Ionicons
              name={jewelleryOpen ? "chevron-up" : "chevron-down"}
              size={20}
              color={pathname?.startsWith("/category") ? "#fff" : colors.text}
              style={{ marginLeft: "auto" }}
            />
          </Pressable>

          {jewelleryOpen && (
            <View
              style={[styles.subMenu, { backgroundColor: colors.background }]}
            >
              {TAGS_ORDER.map((tag) => {
                const items = groupedCats[tag] || [];
                if (!items.length) return null;
                const isOpen = !!openCat[tag];
                return (
                  <View key={tag}>
                    <Pressable
                      onPress={() => toggleCat(tag)}
                      style={styles.catRow}
                    >
                      <Text style={[styles.catLabel, { color: colors.text }]}>
                        {TAG_LABEL[tag]}
                      </Text>
                      <Ionicons
                        name={isOpen ? "remove" : "add"}
                        size={20}
                        color={colors.text}
                      />
                    </Pressable>
                    {isOpen && (
                      <View
                        style={[
                          styles.subCatWrap,
                          { borderLeftColor: colors.border },
                        ]}
                      >
                        {items.map((c) => (
                          <Pressable
                            key={c._id}
                            onPress={() => go(`/category/${c._id}`)}
                            style={styles.subItem}
                          >
                            <Text
                              style={[
                                styles.subLabel,
                                { color: colors.subtext },
                              ]}
                            >
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

          {/* DARK MODE TOGGLE */}
          <View
            style={[
              styles.themeToggleRow,
              {
                borderTopColor: colors.border,
                backgroundColor: colors.background,
              },
            ]}
          >
            <View style={styles.iconWrap}>
              <Ionicons
                name={isDark ? "moon" : "sunny-outline"}
                size={22}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.label, { color: colors.text, flex: 1 }]}>
              {isDark ? "Dark Mode" : "Light Mode"}
            </Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={isDark ? colors.accent : "#fff"}
            />
          </View>
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
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logo: {
    width: "100%",
    height: 160,
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
  },
  subCatWrap: {
    paddingLeft: 14,
    paddingBottom: 6,
    borderLeftWidth: 2,
    marginLeft: 4,
  },
  themeToggleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
