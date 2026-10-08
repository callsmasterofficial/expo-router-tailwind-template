import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import { useTheme } from "../../constants/ThemeContext";
import useFetchTags from "../../customHooks/useFetchTags";
import { addTagWiseProducts } from "../../redux/slices/TagWiseProductsSlice";

const TagWiseProducts = ({ tagName, cats, navigation }) => {
  const { colors } = useTheme();
  const catIdsByTagName = cats.map(
    (item) => item.tags[0] === tagName && item._id,
  );
  catIdsByTagName.forEach((item) =>
    useFetchTags(
      `https://gold.accessdashboard.live/api/app/products-by-category/${item}`,
      addTagWiseProducts,
      tagName,
    ),
  );
  const { products } = useSelector((state) => state.tagWiseProducts);

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text
        style={{
          fontSize: RFPercentage(2),
          padding: RFPercentage(1.5),
          fontWeight: "bold",
          color: colors.accent,
          textTransform: "uppercase",
        }}
      >
        {tagName} Jewellery
      </Text>
      {products[tagName]?.length > 0 && (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: RFPercentage(2),
            paddingHorizontal: RFPercentage(1.5),
          }}
          data={products[tagName]}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                router.push({
                  pathname: "/productPinchToZoom",
                  params: {
                    productImages: JSON.stringify(products[tagName]),
                    imageIndex: index,
                  },
                })
              }
            >
              <View
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 16,
                  padding: RFPercentage(2),
                  width: RFPercentage(18),
                  marginBottom: RFPercentage(1.5),
                  shadowColor: colors.cardShadow,
                  shadowOpacity: 1,
                  shadowOffset: { width: 0, height: 1 },
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <Image
                  source={{ uri: item.images[0].image }}
                  defaultSource={require("../../assets/logoMaroon.png")}
                  style={{ width: "100%", height: RFPercentage(10) }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    gap: RFPercentage(1),
                  }}
                >
                  <Text
                    style={{
                      fontSize: RFPercentage(1.5),
                      fontWeight: "bold",
                      color: colors.text,
                    }}
                  >
                    Purity:{" "}
                    <Text style={{ fontWeight: "normal" }}>
                      {item.purity.slice(item.purity.indexOf("/") + 2)}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: RFPercentage(1.5),
                      fontWeight: "bold",
                      color: colors.text,
                    }}
                  >
                    Net Wt:{" "}
                    <Text style={{ fontWeight: "normal" }}>
                      {item.grossWeight}gm
                    </Text>
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      )}
      {!products[tagName] && (
        <View
          style={{
            width: "100%",
            backgroundColor: colors.background,
            padding: RFPercentage(2),
            marginBottom: RFPercentage(1.5),
          }}
        >
          <Image
            source={require("../../assets/logoMaroon.png")}
            style={{ height: RFPercentage(15), width: "100%" }}
            resizeMode="contain"
          />
          <View>
            <ActivityIndicator
              style={{ marginTop: RFPercentage(1) }}
              color={colors.primary}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default TagWiseProducts;
