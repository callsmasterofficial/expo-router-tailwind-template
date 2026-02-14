import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import ResultModal from "../../components/CalculatorScreen/ResultModal";
import Navbar from '../../components/NavBar';
import { toggleHamburgerToX } from "../../redux/slices/HamburgerToXSlice";
const CalculatorScreen = () => {
    const dispatch = useDispatch();
    useFocusEffect(
        React.useCallback(() => {
            dispatch(toggleHamburgerToX(true));
        }, [])
    );

    const [caratValue, setCaratValue] = useState(24);
    const karat = `discounted${caratValue}k`;
    const fineGoldRatePerGram = useSelector(
        (state) => state.goldRate[karat] / 10
    );
    const [weight, setWeight] = useState("");
    const [weightUnit, setWeightUnit] = useState("gram");
    const [makingCharges, setMakingCharges] = useState("");
    const [checked, setChecked] = useState("In Percentage");
    const [goldPlusWeight, setGoldPlusWeight] = useState("");
    const [finalAmount, setFinalAmount] = useState("");
    const [openResultModal, setOpenResultModal] = useState(false);
    const [addOns, setAddOns] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    useEffect(() => {
        if (openResultModal) {
            calculateHandler();
        }
    }, [
        fineGoldRatePerGram,
        makingCharges,
        caratValue,
        weightUnit,
        checked,
        weight,
        addOns,
        discounts,
    ]);

    // Add-on handlers
    const addNewAddOn = () => {
        setAddOns([...addOns, { label: "", price: "" }]);
    };

    const removeAddOn = (index) => {
        const newAddOns = addOns.filter((_, i) => i !== index);
        setAddOns(newAddOns);
    };

    const updateAddOn = (index, field, value) => {
        const newAddOns = [...addOns];
        newAddOns[index][field] = value;
        setAddOns(newAddOns);
    };

    const getTotalAddOns = () => {
        return addOns.reduce((sum, addon) => sum + (parseFloat(addon.price) || 0), 0);
    };

    // Discount handlers
    const addNewDiscount = () => {
        setDiscounts([...discounts, { label: "", amount: "" }]);
    };

    const removeDiscount = (index) => {
        const newDiscounts = discounts.filter((_, i) => i !== index);
        setDiscounts(newDiscounts);
    };

    const updateDiscount = (index, field, value) => {
        const newDiscounts = [...discounts];
        newDiscounts[index][field] = value;
        setDiscounts(newDiscounts);
    };

    const getTotalDiscounts = () => {
        return discounts.reduce((sum, discount) => sum + (parseFloat(discount.amount) || 0), 0);
    };
    let goldValuePreference;
    const calculateHandler = () => {
        if (fineGoldRatePerGram > 0) {
            setOpenResultModal(true);
            goldValuePreference = Number(fineGoldRatePerGram);
            setGoldPlusWeight(Math.round(goldValuePreference * weight * 100) / 100);
            let makingAmount =
                checked === "In Amount"
                    ? Number(makingCharges)
                    : Number((makingCharges * (goldValuePreference * weight)) / 100);
            let addOnsTotal = getTotalAddOns();
            let discountsTotal = getTotalDiscounts();
            let finalPrice = goldValuePreference * weight;
            if (weightUnit === "gram") {
                setFinalAmount(finalPrice + makingAmount + addOnsTotal - discountsTotal);
            } else if (weightUnit === "kg") {
                setGoldPlusWeight((goldValuePreference * weight * 1000).toFixed(2));
                setFinalAmount(finalPrice * 1000 + makingAmount + addOnsTotal - discountsTotal);
            }
        }
    };
    const resetHandler = () => {
        setMakingCharges("");
        setCaratValue(24);
        setWeightUnit("gram");
        setWeight("");
        setFinalAmount("");
        setChecked("In Percentage");
        setAddOns([]);
        setDiscounts([]);
    };
    return (
        <>
            <Navbar />
            <ScrollView style={{ paddingHorizontal: RFPercentage(2) }} showsVerticalScrollIndicator={false}>
                <View className="">
                    <Text
                        className="text-text  font-semibold capitalize"
                        style={{
                            fontSize: RFPercentage(1.8),
                            marginVertical: RFPercentage(2),
                        }}
                    >
                        choose your gold carat value (k)
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingBottom: RFPercentage(2),
                        }}
                    >
                        {[24, 22, 18, 14].map((item, index) => (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => setCaratValue(item)}
                            >
                                <View
                                    className={`rounded-3xl  border-[1px] w-[23%] ${caratValue === item
                                        ? "bg-purple-50 border-primaryLight"
                                        : "bg-white border-white"
                                        }`}
                                    style={{
                                        padding: RFPercentage(1.5),
                                        shadowColor: "black",
                                        shadowOpacity: 0.26,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowRadius: 2,
                                        elevation: 3,
                                    }}
                                >
                                    <Text
                                        className="text-primaryLight font-semibold text-center"
                                        style={{
                                            fontSize: RFPercentage(1.5),
                                        }}
                                    >
                                        {item}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                    <Text
                        className="text-text  font-semibold capitalize"
                        style={{
                            fontSize: RFPercentage(1.8),
                            marginBottom: RFPercentage(2),
                        }}
                    >
                        enter the weight
                    </Text>
                    <View
                        className="items-center flex-row justify-between"
                        style={{ marginBottom: RFPercentage(2) }}
                    >
                        <TextInput
                            className="w-[65%] justify-between bg-white rounded-2xl border-[1px] border-white text-primaryLight focus:bg-purple-50 focus:border-primaryLight font-semibold"
                            style={{
                                padding: RFPercentage(1.5),
                                shadowColor: "black",
                                shadowOpacity: 0.26,
                                shadowOffset: { width: 0, height: 2 },
                                shadowRadius: 2,
                                elevation: 3,
                                fontSize: RFPercentage(1.5),
                            }}
                            keyboardType="decimal-pad"
                            value={weight}
                            onChangeText={setWeight}
                        />
                        {["gram", "kg"].map((item, index) => (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => setWeightUnit(item)}
                            >
                                <View
                                    key={index}
                                    className={`rounded-2xl  border-[1px] w-[15%] items-center justify-center flex-row h-full ${weightUnit === item
                                        ? "bg-purple-50 border-primaryLight"
                                        : "bg-white border-white"
                                        }`}
                                    style={{
                                        shadowColor: "black",
                                        shadowOpacity: 0.26,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowRadius: 2,
                                        elevation: 3,
                                    }}
                                >
                                    <Text
                                        className="text-primaryLight font-semibold"
                                        style={{
                                            fontSize: RFPercentage(1.5),
                                        }}
                                    >
                                        {item}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                    {weight < 1 && weight !== "" && (
                        <Text
                            className="text-red-600 font-medium"
                            style={{
                                fontSize: RFPercentage(1.5),
                                marginBottom: RFPercentage(2),
                            }}
                        >
                            Enter atleast 1gm or more
                        </Text>
                    )}
                    <Text
                        className="text-text  font-semibold capitalize"
                        style={{
                            fontSize: RFPercentage(1.8),
                            marginBottom: RFPercentage(2),
                        }}
                    >
                        enter product making Charges ({checked === "In Amount" ? "₹" : "%"})
                    </Text>
                    <TextInput
                        className="w-full justify-between bg-white rounded-2xl border-[1px] border-white text-primaryLight focus:bg-purple-50 focus:border-primaryLight font-semibold"
                        style={{
                            padding: RFPercentage(1.5),
                            marginBottom: RFPercentage(1),
                            shadowColor: "black",
                            shadowOpacity: 0.26,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 2,
                            elevation: 3,
                            fontSize: RFPercentage(1.5),
                        }}
                        keyboardType="decimal-pad"
                        value={makingCharges}
                        onChangeText={setMakingCharges}
                    />
                    <View
                        className="flex-row justify-between"
                        style={{ marginBottom: RFPercentage(2) }}
                    >
                    </View>
                    {/* Add-Ons Section */}
                    <View style={{ marginBottom: RFPercentage(2) }}>
                        <View className="flex-row items-center justify-between" style={{ marginBottom: RFPercentage(1) }}>
                            <Text
                                className="text-text font-semibold capitalize"
                                style={{ fontSize: RFPercentage(1.8) }}
                            >
                                add-ons (optional)
                            </Text>
                            <TouchableOpacity
                                onPress={addNewAddOn}
                                className="bg-primaryLight rounded-full"
                                style={{
                                    paddingHorizontal: RFPercentage(1.5),
                                    paddingVertical: RFPercentage(0.5),
                                }}
                            >
                                <Text
                                    className="text-white font-semibold"
                                    style={{ fontSize: RFPercentage(1.5) }}
                                >
                                    + Add
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {addOns.map((addon, index) => (
                            <View
                                key={index}
                                className="flex-row items-center justify-between"
                                style={{ marginBottom: RFPercentage(1) }}
                            >
                                <TextInput
                                    className="w-[45%] bg-white rounded-2xl border-[1px] border-white text-primaryLight focus:bg-purple-50 focus:border-primaryLight font-semibold"
                                    style={{
                                        padding: RFPercentage(1.5),
                                        shadowColor: "black",
                                        shadowOpacity: 0.26,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowRadius: 2,
                                        elevation: 3,
                                        fontSize: RFPercentage(1.5),
                                    }}
                                    placeholder="Label (e.g. Stone)"
                                    placeholderTextColor="#a0a0a0"
                                    value={addon.label}
                                    onChangeText={(value) => updateAddOn(index, "label", value)}
                                />
                                <TextInput
                                    className="w-[35%] bg-white rounded-2xl border-[1px] border-white text-primaryLight focus:bg-purple-50 focus:border-primaryLight font-semibold"
                                    style={{
                                        padding: RFPercentage(1.5),
                                        shadowColor: "black",
                                        shadowOpacity: 0.26,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowRadius: 2,
                                        elevation: 3,
                                        fontSize: RFPercentage(1.5),
                                    }}
                                    placeholder="Price (₹)"
                                    placeholderTextColor="#a0a0a0"
                                    keyboardType="decimal-pad"
                                    value={addon.price}
                                    onChangeText={(value) => updateAddOn(index, "price", value)}
                                />
                                <TouchableOpacity
                                    onPress={() => removeAddOn(index)}
                                    className="bg-red-500 rounded-full items-center justify-center"
                                    style={{
                                        width: RFPercentage(4),
                                        height: RFPercentage(4),
                                        shadowColor: "black",
                                        shadowOpacity: 0.26,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowRadius: 2,
                                        elevation: 3,
                                    }}
                                >
                                    <Text
                                        className="text-white font-bold"
                                        style={{ fontSize: RFPercentage(2) }}
                                    >
                                        ×
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        {addOns.length > 0 && (
                            <Text
                                className="text-primaryLight font-medium text-right"
                                style={{ fontSize: RFPercentage(1.5), marginTop: RFPercentage(0.5) }}
                            >
                                Add-Ons Total: ₹ {getTotalAddOns().toFixed(2)}
                            </Text>
                        )}
                    </View>

                    {/* Discounts Section */}
                    <View style={{ marginBottom: RFPercentage(2) }}>
                        <View className="flex-row items-center justify-between" style={{ marginBottom: RFPercentage(1) }}>
                            <Text
                                className="text-text font-semibold capitalize"
                                style={{ fontSize: RFPercentage(1.8) }}
                            >
                                discounts (optional)
                            </Text>
                            <TouchableOpacity
                                onPress={addNewDiscount}
                                className="bg-green-600 rounded-full"
                                style={{
                                    paddingHorizontal: RFPercentage(1.5),
                                    paddingVertical: RFPercentage(0.5),
                                }}
                            >
                                <Text
                                    className="text-white font-semibold"
                                    style={{ fontSize: RFPercentage(1.5) }}
                                >
                                    + Add
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {discounts.map((discount, index) => (
                            <View
                                key={index}
                                className="flex-row items-center justify-between"
                                style={{ marginBottom: RFPercentage(1) }}
                            >
                                <TextInput
                                    className="w-[45%] bg-white rounded-2xl border-[1px] border-white text-green-600 focus:bg-green-50 focus:border-green-600 font-semibold"
                                    style={{
                                        padding: RFPercentage(1.5),
                                        shadowColor: "black",
                                        shadowOpacity: 0.26,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowRadius: 2,
                                        elevation: 3,
                                        fontSize: RFPercentage(1.5),
                                    }}
                                    placeholder="Label (e.g. Festival)"
                                    placeholderTextColor="#a0a0a0"
                                    value={discount.label}
                                    onChangeText={(value) => updateDiscount(index, "label", value)}
                                />
                                <TextInput
                                    className="w-[35%] bg-white rounded-2xl border-[1px] border-white text-green-600 focus:bg-green-50 focus:border-green-600 font-semibold"
                                    style={{
                                        padding: RFPercentage(1.5),
                                        shadowColor: "black",
                                        shadowOpacity: 0.26,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowRadius: 2,
                                        elevation: 3,
                                        fontSize: RFPercentage(1.5),
                                    }}
                                    placeholder="Amount (₹)"
                                    placeholderTextColor="#a0a0a0"
                                    keyboardType="decimal-pad"
                                    value={discount.amount}
                                    onChangeText={(value) => updateDiscount(index, "amount", value)}
                                />
                                <TouchableOpacity
                                    onPress={() => removeDiscount(index)}
                                    className="bg-red-500 rounded-full items-center justify-center"
                                    style={{
                                        width: RFPercentage(4),
                                        height: RFPercentage(4),
                                        shadowColor: "black",
                                        shadowOpacity: 0.26,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowRadius: 2,
                                        elevation: 3,
                                    }}
                                >
                                    <Text
                                        className="text-white font-bold"
                                        style={{ fontSize: RFPercentage(2) }}
                                    >
                                        ×
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        {discounts.length > 0 && (
                            <Text
                                className="text-green-600 font-medium text-right"
                                style={{ fontSize: RFPercentage(1.5), marginTop: RFPercentage(0.5) }}
                            >
                                Discounts Total: - ₹ {getTotalDiscounts().toFixed(2)}
                            </Text>
                        )}
                    </View>
                    <View
                        className="flex-row items-center justify-between"
                        style={{ marginBottom: RFPercentage(2) }}
                    >
                        <TouchableWithoutFeedback onPress={resetHandler}>
                            <View
                                className="bg-purple-50 border-[1px] border-primaryLight w-[48%] rounded-2xl"
                                style={{
                                    padding: RFPercentage(1.5),
                                    shadowColor: "black",
                                    shadowOpacity: 0.26,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowRadius: 2,
                                    elevation: 3,
                                }}
                            >
                                <Text
                                    className="font-semibold capitalize text-center text-primaryLight"
                                    style={{ fontSize: RFPercentage(2) }}
                                >
                                    reset
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setOpenResultModal(true);
                                calculateHandler();
                            }}
                        >
                            <View
                                className="bg-purple-50 border-[1px] border-primaryLight w-[48%] rounded-2xl"
                                style={{
                                    padding: RFPercentage(1.5),
                                    shadowColor: "black",
                                    shadowOpacity: 0.26,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowRadius: 2,
                                    elevation: 3,
                                }}
                            >
                                <Text
                                    className="font-semibold capitalize text-center text-primaryLight"
                                    style={{
                                        fontSize: RFPercentage(2),
                                    }}
                                >
                                    calculate
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </ScrollView>
            {finalAmount > 0 && weight >= 2.5 && makingCharges > 0 && (
                <View
                    className={`${openResultModal ? "flex-col" : "hidden"
                        } absolute top-0 w-full h-full`}
                >
                    <View className="bg-black opacity-50 z-20 w-full h-full"></View>
                    <View className="z-50">
                        <ResultModal
                            carat={caratValue}
                            weight={weight}
                            weightUnit={weightUnit}
                            goldPlusWeight={goldPlusWeight}
                            checked={checked}
                            makingCharges={makingCharges}
                            hallmarkCharges={45}
                            packingCharges={100}
                            finalAmount={finalAmount}
                            openResultModal={openResultModal}
                            setOpenResultModal={setOpenResultModal}
                            addOns={addOns}
                            discounts={discounts}
                        />
                    </View>
                </View>
            )}
        </>
    );
};

export default CalculatorScreen;
