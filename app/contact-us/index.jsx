import { useState } from "react";
import {
    Image,
    Linking,
    Platform,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { RFPercentage } from "react-native-responsive-fontsize";
import TimingsModal from "../../components/ContactUsScreen/TimingsModal";
import GoBackHeader from "../../components/GoBackHeader";
import branchWiseData from "../../constants/branchWiseData";
import {
    ChevronDownIcon,
    ClockIcon,
    DirectionsIcon,
    FacebookIcon,
    InstagramIcon,
} from "../../icons";
import WhatsAppIcon from "../../icons/WhatsAppIcon";
import { sendWhatsApp } from "../../utilities/whatsAppFn";

const ContactUsScreen = () => {
    const [openTimingsModal, setOpenTimingsModal] = useState(false);
    const [selected, setSelected] = useState("mv branch");
    console.log("selected", selected);
    const redirectToMaps = (latitude, longitude, label) => {
        const url = Platform.select({
            ios: "maps:" + latitude + "," + longitude + "?q=",
            android: "geo:" + latitude + "," + longitude + "?q=" + label,
        });
        Linking.openURL(url);
    };
    const data = [
        { key: "mv branch", value: "Madhu Vihar" },
        { key: "rn branch", value: "Ram Nagar" },
        {
            key: "durgapuri branch",
            value: "Durgapuri ",
        },
        {
            key: "jyoti nagar branch",
            value: "Jyoti Nagar Branch",
        },
        {
            key: "yv branch",
            value: "Yamuna Vihar (coming soon)",
            disabled: true,
        },
        {
            key: "nn branch",
            value: "Nand Nagar (coming soon)",
            disabled: true,
        },
    ];
    const getIndex = () => {
        const index = branchWiseData.findIndex((item) => item.id === selected);
        return index;
    };
    return (
        <>
            <GoBackHeader productName={"Contact Us"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: RFPercentage(2) }} className="flex-row">
                    <View
                        className="justify-center"
                        style={{ maxHeight: RFPercentage(5) }}
                    >
                        <Text
                            className="font-bold text-primaryLight"
                            style={{ fontSize: RFPercentage(2) }}
                        >
                            Select Branch:
                        </Text>
                    </View>
                    <View className="flex-grow" style={{ marginLeft: RFPercentage(1) }}>
                        <SelectList
                            setSelected={(val) => setSelected(val)}
                            data={data}
                            search={false}
                            placeholder={"Madhu Vihar"}
                            inputStyles={{ fontSize: RFPercentage(2) }}
                            dropdownTextStyles={{ fontSize: RFPercentage(2) }}
                            disabledTextStyles={{
                                fontSize: RFPercentage(1.6),
                                color: "gray",
                            }}
                            disabledItemStyles={{ backgroundColor: "#faf5ff" }}
                            boxStyles={{
                                borderColor: "#702963",
                                borderWidth: RFPercentage(0.1),
                                borderRadius: RFPercentage(10),
                                backgroundColor: "#faf5ff",
                            }}
                            dropdownStyles={{
                                borderColor: "#702963",
                                borderWidth: RFPercentage(0.1),
                                borderRadius: RFPercentage(1.2),
                                backgroundColor: "#faf5ff",
                            }}
                            arrowicon={
                                <ChevronDownIcon size={RFPercentage(2.5)} color={"#702963"} />
                            }
                        />
                    </View>
                </View>
                <Image
                    source={require("../../assets/logoPurple.png")}
                    style={{
                        width: "100%",
                        height: RFPercentage(20),
                        marginTop: RFPercentage(1),
                    }}
                    resizeMode="contain"
                />
                {branchWiseData.map((item, index) => (
                    <View key={index}>
                        {item.id === selected && (
                            <View className="justify-center items-center" key={index}>
                                <Text
                                    className="text-primaryLight font-semibold"
                                    style={{
                                        marginTop: RFPercentage(1),
                                        fontSize: RFPercentage(1.7),
                                    }}
                                >
                                    Phone:{" "}
                                    <Text className="underline font-normal">
                                        +91-{item.phone}
                                    </Text>
                                </Text>
                                <Text
                                    className="text-primaryLight font-semibold"
                                    style={{
                                        marginTop: RFPercentage(1),
                                        fontSize: RFPercentage(1.7),
                                    }}
                                >
                                    Address:{" "}
                                    <Text className="underline font-normal">{item.address1}</Text>
                                </Text>
                                <Text
                                    className="text-primaryLight underline text-center"
                                    style={{
                                        marginTop: RFPercentage(1),
                                        marginBottom: RFPercentage(2),
                                        fontSize: RFPercentage(1.7),
                                    }}
                                >
                                    {item.address2}
                                </Text>
                                {[
                                    {
                                        label: "Timings",
                                        icon: (
                                            <ClockIcon
                                                size={RFPercentage(2)}
                                                color="#702963"
                                                fill="#702963"
                                            />
                                        ),
                                        function: () => setOpenTimingsModal(true),
                                    },
                                    {
                                        label: "Get Directions",
                                        icon: (
                                            <DirectionsIcon
                                                size={RFPercentage(2.3)}
                                                color="#702963"
                                                fill="#702963"
                                            />
                                        ),
                                        function: () =>
                                            redirectToMaps(item.latitude, item.longitude, item.label),
                                    },
                                ].map((item, index) => (
                                    <TouchableWithoutFeedback onPress={item.function} key={index}>
                                        <View
                                            className={`rounded-3xl   bg-white`}
                                            style={{
                                                padding: RFPercentage(1, 5),
                                                shadowColor: "black",
                                                shadowOpacity: 0.26,
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowRadius: 2,
                                                elevation: 3,
                                                marginBottom: RFPercentage(2),
                                            }}
                                        >
                                            <View className="flex-row justify-between items-center">
                                                <View className="flex-row items-center">
                                                    <View
                                                        className="rounded-2xl bg-purple-50 justify-center items-center"
                                                        style={{
                                                            width: RFPercentage(5),
                                                            height: RFPercentage(5),
                                                            // backgroundColor: "rgba(255, 218, 213, 0.5)",
                                                        }}
                                                    >
                                                        {item.icon}
                                                    </View>
                                                    <Text
                                                        className="text-primaryLight font-semibold"
                                                        style={{
                                                            fontSize: RFPercentage(1.3),
                                                            marginLeft: RFPercentage(1),
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
                <View
                    style={{
                        padding: RFPercentage(2),
                    }}
                    className="w-full bg-purple-50"
                >
                    <Text
                        className="text-center capitalize text-primaryLight font-semibold tracking-wider"
                        style={{ fontSize: RFPercentage(2), marginBottom: RFPercentage(2) }}
                    >
                        follow us on
                    </Text>
                    <View className="justify-around items-center flex-row">
                        {[
                            {
                                label: "instagram",
                                icon: (
                                    <InstagramIcon
                                        color="white"
                                        fill="white"
                                        size={RFPercentage(3)}
                                    />
                                ),
                                function: () =>
                                    Linking.openURL(branchWiseData[getIndex()].instagramLink),
                            },
                            {
                                label: "facebook",
                                icon: (
                                    <FacebookIcon
                                        color="white"
                                        fill="white"
                                        size={RFPercentage(3)}
                                    />
                                ),
                                function: () =>
                                    Linking.openURL(branchWiseData[getIndex()].facebookLink),
                            },
                            {
                                label: "whatsapp",
                                icon: (
                                    <WhatsAppIcon
                                        color="white"
                                        fill="white"
                                        size={RFPercentage(3)}
                                    />
                                ),
                                function: () =>
                                    sendWhatsApp(branchWiseData[getIndex()].whatsApp),
                            },
                        ].map((item, index) => (
                            <TouchableWithoutFeedback onPress={item.function} key={index}>
                                <View className="justify-center items-center">
                                    <View
                                        className="bg-primaryLight rounded-full justify-center items-center"
                                        style={{ width: RFPercentage(7), height: RFPercentage(7) }}
                                    >
                                        {item.icon}
                                    </View>
                                    <Text
                                        className="text-primaryLight font-semibold capitalize"
                                        style={{
                                            marginTop: RFPercentage(1),
                                            fontSize: RFPercentage(1.5),
                                        }}
                                    >
                                        {item.label}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </View>
                <View style={{ padding: RFPercentage(2) }}>
                    <View
                        className="w-full border-primaryLight"
                        style={{ borderWidth: RFPercentage(0.2) }}
                    >
                        <View
                            className="bg-white border-primaryLight"
                            style={{
                                padding: RFPercentage(1),
                                borderBottomWidth: RFPercentage(0.2),
                            }}
                        >
                            <Image
                                source={require("../../assets/iciciBankLogo.png")}
                                className="w-full"
                                style={{ height: RFPercentage(7) }}
                                resizeMode="stretch"
                            />
                        </View>
                        <View style={{ padding: RFPercentage(2), gap: RFPercentage(1) }}>
                            {[
                                { left: "Bank Name", right: "ICICI Bank" },
                                {
                                    left: "Account Name",
                                    right: branchWiseData[getIndex()].accountName,
                                },
                                {
                                    left: "IFSC Code",
                                    right: branchWiseData[getIndex()].ifscCode,
                                },
                                {
                                    left: "Account No",
                                    right: branchWiseData[getIndex()].accountNumber,
                                },
                                {
                                    left: "Branch Name",
                                    right: branchWiseData[getIndex()].brachName,
                                },
                            ].map((item, index) => (
                                <View className="flex-row" key={index}>
                                    <Text
                                        className="w-[48%] font-bold text-primary"
                                        style={{ fontSize: RFPercentage(1.8) }}
                                    >
                                        {item.left}
                                    </Text>
                                    <Text
                                        className="w-[4%] font-semibold text-primary"
                                        style={{ fontSize: RFPercentage(1.8) }}
                                    >
                                        ::
                                    </Text>
                                    <Text
                                        className="w-[48%] font-semibold text-primary"
                                        style={{ fontSize: RFPercentage(1.8) }}
                                    >
                                        {item.right}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View
                className={`${openTimingsModal ? "flex-col" : "hidden"
                    } absolute top-0 w-full h-full`}
            >
                <View className="bg-black opacity-50 z-20 w-full h-full"></View>
                <View className="z-50">
                    <TimingsModal
                        openTimingsModal={openTimingsModal}
                        setOpenTimingsModal={setOpenTimingsModal}
                        timingTable={branchWiseData[getIndex()].timings}
                    />
                </View>
            </View>
        </>
    );
};

export default ContactUsScreen;
