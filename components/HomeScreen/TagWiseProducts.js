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
import useFetchTags from "../../customHooks/useFetchTags";
import { addTagWiseProducts } from "../../redux/slices/TagWiseProductsSlice";

const TagWiseProducts = ({ tagName, cats, navigation }) => {
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
    <View>
      <Text
        style={{ fontSize: RFPercentage(2), padding: RFPercentage(1.5) }}
        className="font-bold text-primaryLight uppercase"
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
                navigation.navigate("ProductPinchToZoom", {
                  productImages: products[tagName],
                  imageIndex: index,
                })
              }
            >
              <View
                className="bg-white rounded-2xl"
                style={{
                  padding: RFPercentage(2),
                  width: RFPercentage(18),
                  marginBottom: RFPercentage(1.5),
                  shadowColor: "black",
                  shadowOpacity: 0.26,
                  shadowOffset: { width: 0, height: 1 },
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <Image
                  source={{ uri: item.images[0].image }}
                  defaultSource={require("../../assets/logoPurple.png")}
                  className="w-full"
                  style={{ height: RFPercentage(10) }}
                  resizeMode="contain"
                />
                <View
                  className="w-full items-center"
                  style={{ gap: RFPercentage(1) }}
                >
                  <Text
                    style={{ fontSize: RFPercentage(1.5) }}
                    className="font-bold"
                  >
                    Purity:&nbsp;
                    <Text className="font-normal">
                      {item.purity.slice(item.purity.indexOf("/") + 2)}
                    </Text>
                  </Text>
                  <Text
                    style={{ fontSize: RFPercentage(1.5) }}
                    className="font-bold"
                  >
                    Net Wt:&nbsp;
                    <Text className="font-normal">{item.grossWeight}gm</Text>
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      )}
      {!products[tagName] && (
        <View
          className="w-full bg-purple-50"
          style={{ padding: RFPercentage(2), marginBottom: RFPercentage(1.5) }}
        >
          <Image
            source={require("../../assets/logoPurple.png")}
            style={{ height: RFPercentage(10) }}
            className="w-full"
            resizeMode="contain"
          />
          <View>
            <ActivityIndicator
              style={{ marginTop: RFPercentage(1) }}
              color={"#702963"}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default TagWiseProducts;
