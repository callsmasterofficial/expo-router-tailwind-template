import { router } from "expo-router";
import {
    Dimensions,
    FlatList,
    Image,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import GetHeart from "../../components/GetHeart";
import NavBar from "../../components/NavBar";
import {
    addMyProducts,
    removeMyProducts,
} from "../../redux/slices/WishlistSlice";

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlistProducts = useSelector(
        (state) => state.wishlistProducts.wishProducts
    );
    const windowWidth = Dimensions.get("window").width;

    function checkFindProduct(product) {
        const findproduct = wishlistProducts.find(
            (item) => item._id === product._id
        );
        return findproduct;
    }

    const wishlistFunction = (product) => {
        if (checkFindProduct(product)) {
            dispatch(removeMyProducts(product));
        } else {
            dispatch(addMyProducts(product));
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <NavBar />
            <View style={{ padding: RFPercentage(2) }}>
                <Text style={{ fontSize: RFPercentage(3), fontWeight: "bold", marginBottom: RFPercentage(2) }}>
                    My Wishlist
                </Text>
            </View>

            {wishlistProducts?.length > 0 ? (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: RFPercentage(2),
                        rowGap: RFPercentage(1),
                        paddingBottom: RFPercentage(10)
                    }}
                    numColumns={windowWidth > 500 ? 3 : 2}
                    columnWrapperStyle={{ gap: RFPercentage(1) }}
                    data={wishlistProducts}
                    renderItem={({ item, index }) => (
                        <TouchableWithoutFeedback
                            onPress={() =>
                                router.push({
                                    pathname: "/productPinchToZoom",
                                    params: {
                                        productImages: JSON.stringify(wishlistProducts),
                                        imageIndex: index,
                                    },
                                })
                            }
                        >
                            <View
                                className={`${windowWidth > 500 ? "w-[32.3%]" : "w-[49%]"
                                    } bg-white rounded-2xl relative`}
                                style={{
                                    shadowColor: "black",
                                    shadowOpacity: 0.26,
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowRadius: 2,
                                    elevation: 1,
                                    padding: RFPercentage(1),
                                }}
                            >
                                <Image
                                    source={{ uri: item.images[0].image }}
                                    defaultSource={require("../../assets/loaderHorizontal.png")}
                                    className="w-full"
                                    style={{ height: RFPercentage(20) }}
                                    resizeMode="contain"
                                />
                                <TouchableWithoutFeedback
                                    onPress={() => wishlistFunction(item)}
                                >
                                    <View
                                        className={`rounded-full absolute top-0 right-0 border-[1px] ${checkFindProduct(item)
                                            ? "border-primaryLight"
                                            : "border-gray-500"
                                            } z-50`}
                                        style={{
                                            padding: RFPercentage(0.5),
                                            right: RFPercentage(1),
                                            top: RFPercentage(1),
                                        }}
                                    >
                                        <GetHeart findproduct={checkFindProduct(item)} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <View className="mt-2">
                                    <Text style={{ fontSize: RFPercentage(1.5), fontWeight: "bold" }}>
                                        {item.name}
                                    </Text>
                                    <Text style={{ fontSize: RFPercentage(1.5) }}>
                                        Net Wt: {item.grossWeight}gm
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                />
            ) : (
                <View className="flex-1 items-center justify-center">
                    <Text style={{ fontSize: RFPercentage(2), color: "gray" }}>
                        No items in wishlist
                    </Text>
                </View>
            )}
        </View>
    );
};

export default Wishlist;
