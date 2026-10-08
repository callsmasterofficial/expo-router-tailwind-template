import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import Slick from "react-native-slick";
import { useTheme } from "../../constants/ThemeContext";
import { ChevronRightIcon, XmarkIcon } from "../../icons";
const { width } = Dimensions.get("window");

const styles = {
  container: {
    height: "100%",
  },

  slide1: {
    height: RFPercentage(35),
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
  },

  image: {
    width,
    height: RFPercentage(35),
    // flex: 1,
  },
  paginationStyle: {
    position: "absolute",
    bottom: 30,
    left: "50%",
  },
  paginationText: {
    color: "#4f3268",
    fontSize: RFPercentage(2.5),
  },
};

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ fontSize: RFPercentage(1.5), color: "gray" }}>
        <Text style={styles.paginationText}>{index + 1}</Text>&nbsp;/&nbsp;
        {total}
      </Text>
    </View>
  );
};

const ProductSlide = ({
  item,
  showControls,
  toggleControls,
  selectedImage,
  onSelectImage,
}) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  return (
    <View
      className="flex-1 relative"
      style={{ backgroundColor: colors.background }}
    >
      <ReactNativeZoomableView
        maxZoom={3}
        minZoom={1}
        visualTouchFeedbackEnabled={false}
        zoomStep={1}
        onSingleTap={toggleControls}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
          source={{ uri: selectedImage }}
          defaultSource={require("../../assets/loaderHorizontal.png")}
          onLoadEnd={() => setLoading(true)}
        />
      </ReactNativeZoomableView>
      {loading && showControls && (
        <View
          className="absolute w-full items-center"
          style={{
            bottom: RFPercentage(5),
            backgroundColor: colors.surface,
            paddingVertical: RFPercentage(2),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {item.images && item.images.length > 1 && (
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 15,
                paddingHorizontal: 20,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {item.images.map((img, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => onSelectImage(img.image)}
                >
                  <Image
                    source={{ uri: img.image }}
                    style={{
                      width: RFPercentage(8),
                      height: RFPercentage(8),
                      borderRadius: 8,
                      borderWidth: selectedImage === img.image ? 2 : 1,
                      borderColor:
                        selectedImage === img.image ? colors.primary : "#ddd",
                      backgroundColor: "#fff",
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Text
            style={{
              fontSize: RFPercentage(2.5),
              marginBottom: RFPercentage(1),
              color: colors.text,
            }}
            className="capitalize font-bold"
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: RFPercentage(2.2),
              marginBottom: RFPercentage(1),
              color: colors.subtext,
            }}
            className="capitalize"
          >
            {item.purity.slice(item.purity.indexOf("/") + 2)}
          </Text>
          <Text
            style={{
              fontSize: RFPercentage(2.2),
              fontWeight: "bold",
              color: colors.primary,
            }}
          >
            Gross Wt: {item.grossWeight}gm
          </Text>
        </View>
      )}
    </View>
  );
};

export default function ProductPinchToZoom() {
  const { colors } = useTheme();
  const { imageIndex, productImages } = useLocalSearchParams();
  const parsedProductImages = productImages ? JSON.parse(productImages) : [];
  const parsedImageIndex = imageIndex ? parseInt(imageIndex) : 0;
  const [showControls, setShowControls] = useState(true);
  const slickRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(parsedImageIndex);

  // Store selected images per product index so they survive Slick re-renders
  const [selectedImages, setSelectedImages] = useState(() => {
    const initial = {};
    parsedProductImages.forEach((item, idx) => {
      initial[idx] = item.images[0]?.image;
    });
    return initial;
  });

  const toggleControls = () => setShowControls((prev) => !prev);

  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={{ backgroundColor: colors.background, flex: 1 }}
      >
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          {showControls && (
            <TouchableOpacity
              className="absolute top-[2%] right-[10px] z-30"
              onPress={() => router.back()}
            >
              <View>
                <XmarkIcon size={RFPercentage(4)} color={colors.primary} />
              </View>
            </TouchableOpacity>
          )}
          <Slick
            ref={slickRef}
            style={styles.wrapper}
            renderPagination={(index, total, context) =>
              showControls ? renderPagination(index, total, context) : <View />
            }
            index={currentSlideIndex}
            showsButtons={false}
            scrollEnabled={false}
            onIndexChanged={(index) => setCurrentSlideIndex(index)}
            dot={
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,.2)",
                  width: 5,
                  height: 5,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
            paginationStyle={{ marginBottom: 20 }}
          >
            {parsedProductImages.map((item, index) => (
              <ProductSlide
                key={index}
                item={item}
                showControls={showControls}
                toggleControls={toggleControls}
                selectedImage={selectedImages[index]}
                onSelectImage={(img) =>
                  setSelectedImages((prev) => ({ ...prev, [index]: img }))
                }
              />
            ))}
          </Slick>
          {showControls && (
            <>
              <TouchableOpacity
                className="absolute left-[10px] z-30"
                style={{ top: "45%" }}
                onPress={() => {
                  slickRef.current?.scrollBy(-1);
                  setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
                }}
              >
                <View
                  className="rotate-180 rounded-full items-center justify-center"
                  style={{
                    padding: RFPercentage(1),
                    backgroundColor: colors.surface,
                  }}
                >
                  <ChevronRightIcon
                    size={RFPercentage(4)}
                    color={colors.primary}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="absolute right-[10px] z-30"
                style={{ top: "45%" }}
                onPress={() => {
                  slickRef.current?.scrollBy(1);
                  setCurrentSlideIndex((prev) =>
                    Math.min(parsedProductImages.length - 1, prev + 1),
                  );
                }}
              >
                <View
                  className="rounded-full items-center justify-center"
                  style={{
                    padding: RFPercentage(1),
                    backgroundColor: colors.surface,
                  }}
                >
                  <ChevronRightIcon
                    size={RFPercentage(4)}
                    color={colors.primary}
                  />
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
