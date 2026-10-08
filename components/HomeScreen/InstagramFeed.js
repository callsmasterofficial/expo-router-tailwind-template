import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { RFPercentage } from "react-native-responsive-fontsize";
import { WebView } from "react-native-webview";
import { useTheme } from "../../constants/ThemeContext";
import { ChevronDownIcon, HeartOutlineIcon, InstagramIcon } from "../../icons";

const InstagramFeed = () => {
  const { colors } = useTheme();
  const [selectedProfile, setSelectedProfile] = useState("urmiljewellers");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [selectedProfile]);

  const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${selectedProfile}/`;

  // Placeholder content - In a real implementation, these would come from an API
  const CAPTION =
    "Latest collection available now! Visit our store to see more exclusive designs. #UrmilJewellers #Gold #Diamond";

  const data = [
    { key: "urmiljewellers", value: "Urmil Jewellers Ram Nagar" },
    { key: "urmiljewellers_durgapuri", value: "Urmil Jewellers Durgapuri" },
    { key: "urmiljewellersyamunavihar", value: "Urmil Jewellers Yamunavihar" },
    { key: "urmil_jew_madhuvihar", value: "Urmil Jewellers Madhuvihar" },
  ];

  return (
    <View
      style={{ marginTop: RFPercentage(2), paddingHorizontal: RFPercentage(0) }}
    >
      <View
        style={{
          backgroundColor: colors.surface,
          paddingBottom: RFPercentage(2),
        }}
      >
        {/* Header with Dropdown */}
        <View
          style={{
            paddingHorizontal: RFPercentage(1.5),
            paddingTop: RFPercentage(1.5),
            paddingBottom: RFPercentage(1),
            zIndex: 10,
          }}
        >
          <SelectList
            setSelected={(val) => setSelectedProfile(val)}
            data={data}
            save="key"
            search={false}
            defaultOption={{ key: "urmiljewellers", value: "Urmil Jewellers" }}
            boxStyles={{
              borderColor: colors.primary,
              borderWidth: RFPercentage(0.1),
              borderRadius: RFPercentage(1),
              backgroundColor: colors.background,
            }}
            dropdownStyles={{
              borderColor: colors.primary,
              borderWidth: RFPercentage(0.1),
              borderRadius: RFPercentage(1),
              backgroundColor: colors.background,
            }}
            inputStyles={{
              fontSize: RFPercentage(1.8),
              color: "#333",
              fontWeight: "600",
            }}
            dropdownTextStyles={{ fontSize: RFPercentage(1.8), color: "#333" }}
            arrowicon={
              <ChevronDownIcon
                size={RFPercentage(2.5)}
                color={colors.primary}
              />
            }
          />
        </View>

        {/* Post Image */}
        <View
          style={{
            height: RFPercentage(60),
            width: "100%",
            backgroundColor: colors.background,
          }}
        >
          {!hasError ? (
            <WebView
              key={selectedProfile}
              source={{ uri: INSTAGRAM_PROFILE_URL }}
              style={{ flex: 1, width: "100%" }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              originWhitelist={["*"]}
              userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
              onShouldStartLoadWithRequest={(request) => {
                const isHttp =
                  request.url.startsWith("http://") ||
                  request.url.startsWith("https://");
                const isAbout = request.url.startsWith("about:blank");
                if (isHttp || isAbout) {
                  return true;
                }
                // Block execution of non-http schemes (like intent://) to prevent errors
                return false;
              }}
              renderLoading={() => (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              )}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn("WebView error: ", nativeEvent);
                setHasError(true);
              }}
              onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn("WebView HTTP error: ", nativeEvent);
                setHasError(true);
              }}
              scrollEnabled={false}
            />
          ) : (
            <Image
              source={require("../../assets/logoMaroon.png")}
              style={{ width: "80%", height: "80%" }}
              resizeMode="contain"
            />
          )}
        </View>
      </View>
      {/* </TouchableOpacity> */}

      {/* Action Bar */}
      <View
        className="flex-row items-center justify-between"
        style={{ padding: RFPercentage(1.5) }}
      >
        <View
          className="flex-row items-center"
          style={{ gap: RFPercentage(2) }}
        >
          <HeartOutlineIcon size={RFPercentage(3)} color={colors.primary} />
          <TouchableOpacity
            onPress={() => Linking.openURL(INSTAGRAM_PROFILE_URL)}
          >
            <InstagramIcon size={RFPercentage(3)} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Caption */}
      <View style={{ paddingHorizontal: RFPercentage(1.5) }}>
        <Text style={{ fontSize: RFPercentage(1.6), color: "#333" }}>
          <Text className="font-bold">{selectedProfile} </Text>
          {CAPTION}
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(INSTAGRAM_PROFILE_URL)}
          style={{ marginTop: RFPercentage(0.5) }}
        >
          <Text style={{ fontSize: RFPercentage(1.4), color: "gray" }}>
            View all posts on Instagram
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InstagramFeed;
