import React, { useState } from "react";
import { ActivityIndicator, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { WebView } from 'react-native-webview';
import { HeartOutlineIcon, InstagramIcon } from "../../icons";

const InstagramFeed = () => {
    // This is a static representation. To make this dynamic, you would need to integrate
    // the Instagram Basic Display API to fetch the latest media URL.
    const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/urmiljewellers/";
    const [hasError, setHasError] = useState(false);

    // Placeholder content - In a real implementation, these would come from an API
    const CAPTION = "Latest collection available now! Visit our store to see more exclusive designs. #UrmilJewellers #Gold #Diamond";

    return (
        <View style={{ marginTop: RFPercentage(2), paddingHorizontal: RFPercentage(0) }}>
            <View className="bg-white" style={{ paddingBottom: RFPercentage(2) }}>
                {/* Header */}

                {/* Post Image */}
                {/* <TouchableOpacity onPress={() => Linking.openURL(INSTAGRAM_PROFILE_URL)}> */}
                {/* Post Image */}
                {/* <TouchableOpacity onPress={() => Linking.openURL(INSTAGRAM_PROFILE_URL)}> */}
                <View style={{ height: RFPercentage(60), width: "100%", backgroundColor: '#faf5ff', }}>
                    {!hasError ? (
                        <WebView
                            source={{ uri: INSTAGRAM_PROFILE_URL }}
                            style={{ flex: 1, width: "100%" }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={true}
                            originWhitelist={['*']}
                            userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
                            onShouldStartLoadWithRequest={(request) => {
                                const isHttp = request.url.startsWith('http://') || request.url.startsWith('https://');
                                const isAbout = request.url.startsWith('about:blank');
                                if (isHttp || isAbout) {
                                    return true;
                                }
                                // Block execution of non-http schemes (like intent://) to prevent errors
                                return false;
                            }}
                            renderLoading={() => (
                                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator size="large" color="#702963" />
                                </View>
                            )}
                            onError={(syntheticEvent) => {
                                const { nativeEvent } = syntheticEvent;
                                console.warn('WebView error: ', nativeEvent);
                                setHasError(true);
                            }}
                            onHttpError={(syntheticEvent) => {
                                const { nativeEvent } = syntheticEvent;
                                console.warn('WebView HTTP error: ', nativeEvent);
                                setHasError(true);
                            }}
                            scrollEnabled={false}
                        />
                    ) : (
                        <Image
                            source={require("../../assets/logoPurple.png")}
                            style={{ width: "80%", height: "80%" }}
                            resizeMode="contain"
                        />
                    )}
                </View>
            </View>
            {/* </TouchableOpacity> */}

            {/* Action Bar */}
            <View className="flex-row items-center justify-between" style={{ padding: RFPercentage(1.5) }}>
                <View className="flex-row items-center" style={{ gap: RFPercentage(2) }}>
                    <HeartOutlineIcon size={RFPercentage(3)} color="#702963" />
                    <TouchableOpacity onPress={() => Linking.openURL(INSTAGRAM_PROFILE_URL)}>
                        <InstagramIcon size={RFPercentage(3)} color="#702963" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Caption */}
            <View style={{ paddingHorizontal: RFPercentage(1.5) }}>
                <Text style={{ fontSize: RFPercentage(1.6), color: '#333' }}>
                    <Text className="font-bold">urmiljewellers </Text>
                    {CAPTION}
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL(INSTAGRAM_PROFILE_URL)} style={{ marginTop: RFPercentage(0.5) }}>
                    <Text style={{ fontSize: RFPercentage(1.4), color: 'gray' }}>View all posts on Instagram</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default InstagramFeed;
