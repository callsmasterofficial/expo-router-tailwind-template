import { router, useLocalSearchParams } from "expo-router";
import {
  Dimensions,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import GetHeart from "../../components/GetHeart";
import Loader from "../../components/Loader";
import NavBar from "../../components/NavBar";
import { useTheme } from "../../constants/ThemeContext";
import useFetchWithPagination from "../../customHooks/useFetchWithPagination";
import { addProductsPerCategory } from "../../redux/slices/ProductsPerCategorySlice";
import {
  addMyProducts,
  removeMyProducts,
} from "../../redux/slices/WishlistSlice";

const Categories = ({ navigation }) => {
  const { catId } = useLocalSearchParams();
  const { colors } = useTheme();
  const subCategoryId = catId;
  const dispatch = useDispatch();
  useFetchWithPagination({
    url: `https://gold.accessdashboard.live/api/app/products-by-category/${subCategoryId}`,
    dispatchFunction: addProductsPerCategory,
    config: {
      id: subCategoryId,
    },
  });
  console.log({ subCategoryId });
  const categoryWiseProducts = useSelector(
    (state) => state.productsPerCategories[subCategoryId],
  );
  const windowWidth = Dimensions.get("window").width;
  const wishlistProducts = useSelector(
    (state) => state.wishlistProducts.wishProducts,
  );

  function checkFindProduct(product) {
    const findproduct = wishlistProducts.find(
      (item) => item._id === product._id,
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
    <>
      <NavBar />
      {!categoryWiseProducts && <Loader />}
      {categoryWiseProducts?.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: colors.background }}
          contentContainerStyle={{
            padding: RFPercentage(2),
            rowGap: RFPercentage(1),
            backgroundColor: colors.background,
          }}
          numColumns={windowWidth > 500 ? 3 : 2}
          columnWrapperStyle={{ gap: RFPercentage(1) }}
          data={categoryWiseProducts}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                router.push({
                  pathname: "/productPinchToZoom",
                  params: {
                    productImages: JSON.stringify(categoryWiseProducts),
                    imageIndex: index,
                  },
                })
              }
            >
              <View
                style={{
                  width: windowWidth > 500 ? "32.3%" : "49%",
                  backgroundColor: colors.surface,
                  borderRadius: 16,
                  position: "relative",
                  shadowColor: colors.cardShadow,
                  shadowOpacity: 1,
                  shadowOffset: { width: 0, height: 1 },
                  shadowRadius: 2,
                  elevation: 1,
                  padding: RFPercentage(1),
                }}
              >
                <Image
                  source={{ uri: item.images[0].image }}
                  defaultSource={require("../../assets/loaderHorizontal.png")}
                  style={{ width: "100%", height: RFPercentage(20) }}
                  resizeMode="contain"
                />
                <TouchableWithoutFeedback
                  onPress={() => wishlistFunction(item)}
                >
                  <View
                    style={{
                      borderRadius: 999,
                      position: "absolute",
                      top: 0,
                      right: 0,
                      borderWidth: 1,
                      borderColor: checkFindProduct(item)
                        ? colors.primary
                        : "#6b7280",
                      zIndex: 50,
                      padding: RFPercentage(0.5),
                      right: RFPercentage(1),
                      top: RFPercentage(1),
                    }}
                  >
                    <GetHeart findproduct={checkFindProduct(item)} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      )}
    </>
  );
};

export default Categories;
