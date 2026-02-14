import React from "react";
import { View, Image } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Slick from "react-native-slick";
import { addSliderImages } from "../../redux/slices/SliderImagesSlice";
import useFetch from "../../customHooks/useFetch";
import { useSelector } from "react-redux";

const styles = {
  container: {
    marginTop: RFPercentage(0),
    height: RFPercentage(35),
    backgroundColor: "white",
  },

  slide1: {
    height: RFPercentage(35),
    // justifyContent: "center",
    // alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: RFPercentage(35),
  },
};
export default function SliderHomeScreen() {
  useFetch(
    "https://gold.accessdashboard.live/api/app/component/slider-images",
    addSliderImages
  );
  const { sliderImages } = useSelector((state) => state.sliderImages);
  return (
    <>
      <View style={styles.container}>
        {sliderImages.length > 0 && (
          <Slick autoplay showsPagination={false} style={styles.wrapper}>
            {sliderImages.map((item, index) => (
              <View style={styles.slide1} key={index}>
                <View
                  className="bg-white overflow-hidden items-center"
                  style={{ marginBottom: RFPercentage(2) }}
                >
                  <Image
                    source={{ uri: item }}
                    defaultSource={require("../../assets/loaderHorizontal.png")}
                    resizeMode="stretch"
                    className="bg-white"
                    style={styles.image}
                  />
                </View>
              </View>
            ))}
          </Slick>
        )}
        {sliderImages.length === 0 && (
          <Image
            source={require("../../assets/loaderHorizontal.png")}
            resizeMode="stretch"
            className=""
            style={styles.image}
          />
        )}
      </View>
    </>
  );
}
