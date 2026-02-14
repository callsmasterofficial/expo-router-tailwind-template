import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import Slick from "react-native-slick";
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
        backgroundColor: "white",
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
        color: "#702963",
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

export default function ProductPinchToZoom() {
    const { imageIndex, productImages } = useLocalSearchParams();
    const parsedProductImages = productImages ? JSON.parse(productImages) : [];
    const parsedImageIndex = imageIndex ? parseInt(imageIndex) : 0;
    const [loading, setLoading] = useState(false);

    return (
        <>
            <SafeAreaView edges={["top"]} style={{ backgroundColor: "white" }}>
                <View style={styles.container} className="bg-white">
                    <TouchableOpacity
                        className="absolute top-[2%] right-[10px] z-30"
                        onPress={() => router.back()}
                    >
                        <View>
                            <XmarkIcon size={RFPercentage(4)} color={"#702963"} />
                        </View>
                    </TouchableOpacity>
                    <Slick
                        style={styles.wrapper}
                        renderPagination={renderPagination}
                        index={parsedImageIndex}
                        // showsPagination={false}
                        showsButtons
                        scrollEnabled={false}
                        prevButton={
                            <View className="rotate-180">
                                <ChevronRightIcon size={RFPercentage(4)} color="#702963" />
                            </View>
                        }
                        nextButton={
                            <View>
                                <ChevronRightIcon size={RFPercentage(4)} color="#702963" />
                            </View>
                        }
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
                            <View className="flex-1 relative bg-white" key={index}>
                                <ReactNativeZoomableView
                                    maxZoom={3}
                                    minZoom={1}
                                    visualTouchFeedbackEnabled={false}
                                    zoomStep={1}
                                >
                                    <Image
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            resizeMode: "contain",
                                        }}
                                        source={{ uri: item.images[0].image }}
                                        defaultSource={require(".././../assets/loaderHorizontal.png")}
                                        onLoadEnd={() => setLoading(true)}
                                    />
                                </ReactNativeZoomableView>
                                {loading && (
                                    <View
                                        className="absolute w-full items-center"
                                        style={{ bottom: RFPercentage(8) }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.5),
                                                marginBottom: RFPercentage(2),
                                            }}
                                            className="capitalize"
                                        >
                                            {item.name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.5),
                                                marginBottom: RFPercentage(2),
                                            }}
                                            className="capitalize"
                                        >
                                            {item.purity.slice(item.purity.indexOf("/") + 2)}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.5),
                                                marginBottom: RFPercentage(2),
                                            }}
                                            className=""
                                        >
                                            Net Wt: {item.grossWeight}gm
                                        </Text>
                                    </View>
                                )}
                            </View>
                        ))}
                    </Slick>
                </View>
            </SafeAreaView>
        </>
    );
}
