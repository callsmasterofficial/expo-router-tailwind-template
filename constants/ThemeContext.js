import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const THEME_KEY = "app_theme_mode";

export const lightColors = {
  primary: "#6B0000", // dark maroon
  primaryDark: "#4a0000", // deeper maroon for pressed states
  background: "#FDF5E6", // warm cream
  surface: "#FFFFFF", // white cards
  surfaceAlt: "#fff8ee", // warm off-white alt row
  text: "#1a0000", // very dark maroon text
  subtext: "#7a4a2a", // warm brown subtext
  border: "#e8c97a", // golden border
  borderLight: "#f2e2b0", // lighter golden border
  accent: "#D4AF37", // gold accent maintained
  cardShadow: "rgba(107, 0, 0, 0.12)",
  statusBarStyle: "light-content",
};

export const darkColors = {
  primary: "#D4AF37", // gold is the hero in dark mode
  primaryDark: "#b8951f", // deeper gold for pressed states
  background: "#0a0a0a", // near-pure black
  surface: "#161616", // very dark charcoal card
  surfaceAlt: "#1f1f1f", // slightly lighter charcoal alt row
  text: "#F5F0E8", // warm off-white text
  subtext: "#a89880", // warm muted gold-grey subtext
  border: "#3a3020", // dark gold-tinted border
  borderLight: "#2a2215", // deeper dark border
  accent: "#ffffff", // gold accent
  cardShadow: "rgba(212, 175, 55, 0.15)", // subtle gold glow shadow
  statusBarStyle: "light-content",
};

const ThemeContext = createContext({
  isDark: false,
  colors: lightColors,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_KEY);
        if (stored === "dark") setIsDark(true);
      } catch (_) {}
    })();
  }, []);

  const toggleTheme = useCallback(async () => {
    setIsDark((prev) => {
      const next = !prev;
      AsyncStorage.setItem(THEME_KEY, next ? "dark" : "light").catch(() => {});
      return next;
    });
  }, []);

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
