import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import { useTheme } from "../../constants/ThemeContext";
import { CircularCrossIcon } from "../../icons";
import { commaRegEx } from "../../utilities/commaRegEx";

const ResultModal = ({
  openResultModal,
  setOpenResultModal,
  carat,
  weight,
  checked,
  weightUnit,
  makingCharges,
  hallmarkCharges,
  packingCharges,
  goldPlusWeight,
  addOns = [],
  discounts = [],
}) => {
  const { colors } = useTheme();
  const bidchange = useSelector((state) => state.goldRate.goldIncDec);
  const getMakingCharges =
    checked === "In Amount"
      ? `${
          Math.round((makingCharges / goldPlusWeight) * 100 * 100) / 100
        }% / ₹ ${makingCharges.toString().replace(commaRegEx, ",")}`
      : `${makingCharges}% / ₹ ${(
          Math.round(((makingCharges * goldPlusWeight) / 100) * 100) / 100
        )
          .toString()
          .replace(commaRegEx, ",")}`;
  const gstCalculated =
    checked === "In Amount"
      ? Math.round(
          (((Number(goldPlusWeight) +
            Number(makingCharges) +
            Number(packingCharges) +
            Number(hallmarkCharges)) *
            3) /
            100) *
            100,
        ) / 100
      : Math.round(
          (((Number(goldPlusWeight) +
            (makingCharges * goldPlusWeight) / 100 +
            Number(packingCharges) +
            Number(hallmarkCharges)) *
            3) /
            100) *
            100,
        ) / 100;

  const getTotalAddOns = () => {
    return addOns.reduce(
      (sum, addon) => sum + (parseFloat(addon.price) || 0),
      0,
    );
  };

  const getTotalDiscounts = () => {
    return discounts.reduce(
      (sum, discount) => sum + (parseFloat(discount.amount) || 0),
      0,
    );
  };

  const addOnsTotal = getTotalAddOns();
  const discountsTotal = getTotalDiscounts();
  function getColor(label) {
    if (
      label === "Final Amount (GST + Making + Packing + Hallmarking)" ||
      label === `Gold Weight Amount (${carat}k)`
    ) {
      if (bidchange === "green") {
        return "green";
      }
      if (bidchange === "red") {
        return "red";
      }
      return colors.primary;
    }
    return colors.primary;
  }
  return (
    <Modal visible={openResultModal} animationType="slide" transparent={true}>
      <View
        className="w-full bottom-0 absolute rounded-t-3xl"
        style={{ backgroundColor: colors.surface }}
      >
        <View
          className="rounded-t-3xl flex-row justify-between items-center"
          style={{
            backgroundColor: colors.surfaceAlt,
            padding: RFPercentage(2),
          }}
        >
          <Text
            className="font-semibold"
            style={{ fontSize: RFPercentage(1.5), color: colors.primary }}
          >
            Result
          </Text>
          <TouchableOpacity onPress={() => setOpenResultModal(false)}>
            <CircularCrossIcon
              color={colors.primary}
              fill={colors.primary}
              size={RFPercentage(2)}
            />
          </TouchableOpacity>
        </View>
        <View style={{ padding: RFPercentage(2) }}>
          {/* Base calculation items */}
          {[
            { label: "Gold Weight", value: `${weight} ${weightUnit}` },
            {
              label: `Gold Weight Amount (${carat}k)`,
              value: `₹ ${goldPlusWeight.toString().replace(commaRegEx, ",")}`,
            },
            {
              label: "Making Charges",
              value: getMakingCharges,
            },
            { label: "Hallmarking Charges", value: `₹ ${hallmarkCharges}` },
            { label: "Packing Charges", value: `₹ ${packingCharges}` },
            {
              label: "GST",
              value: `3% / ₹ ${gstCalculated
                .toString()
                .replace(commaRegEx, ",")}`,
            },
          ].map((item, index) => (
            <View
              className="flex-row items-center justify-between border-b-[1px] border-primaryLight/20"
              key={index}
              style={{ padding: RFPercentage(1) }}
            >
              <Text
                className="font-semibold w-[50%]"
                style={{ fontSize: RFPercentage(1.5), color: colors.primary }}
              >
                {item.label}
              </Text>
              <Text
                className=""
                style={{
                  fontSize: RFPercentage(1.5),
                  color: getColor(item.label),
                }}
              >
                {item.value}
              </Text>
            </View>
          ))}

          {/* Add-Ons Section */}
          {addOns.length > 0 &&
            addOns.some((addon) => addon.label && addon.price) && (
              <>
                <View
                  className="flex-row items-center justify-between"
                  style={{
                    padding: RFPercentage(1),
                    marginTop: RFPercentage(1),
                  }}
                >
                  <Text
                    className="text-primary font-bold"
                    style={{ fontSize: RFPercentage(1.5) }}
                  >
                    Add-Ons
                  </Text>
                </View>
                {addOns
                  .filter((addon) => addon.label && addon.price)
                  .map((addon, index) => (
                    <View
                      className="flex-row items-center justify-between border-b-[1px] border-secondary"
                      key={`addon-${index}`}
                      style={{ padding: RFPercentage(1) }}
                    >
                      <Text
                        className="text-primary font-semibold w-[50%]"
                        style={{ fontSize: RFPercentage(1.5) }}
                      >
                        {addon.label}
                      </Text>
                      <Text
                        style={{
                          fontSize: RFPercentage(1.5),
                          color: colors.primary,
                        }}
                      >
                        ₹{" "}
                        {parseFloat(addon.price)
                          .toFixed(2)
                          .toString()
                          .replace(commaRegEx, ",")}
                      </Text>
                    </View>
                  ))}
                <View
                  className="flex-row items-center justify-between border-b-[1px] border-primaryLight/20"
                  style={{ padding: RFPercentage(1) }}
                >
                  <Text
                    className="text-primary font-bold w-[50%]"
                    style={{ fontSize: RFPercentage(1.5) }}
                  >
                    Add-Ons Total
                  </Text>
                  <Text
                    style={{
                      fontSize: RFPercentage(1.5),
                      color: colors.primary,
                      fontWeight: "bold",
                    }}
                  >
                    ₹{" "}
                    {addOnsTotal.toFixed(2).toString().replace(commaRegEx, ",")}
                  </Text>
                </View>
              </>
            )}

          {/* Discounts Section */}
          {discounts.length > 0 &&
            discounts.some((discount) => discount.label && discount.amount) && (
              <>
                <View
                  className="flex-row items-center justify-between"
                  style={{
                    padding: RFPercentage(1),
                    marginTop: RFPercentage(1),
                  }}
                >
                  <Text
                    className="text-green-600 font-bold"
                    style={{ fontSize: RFPercentage(1.5) }}
                  >
                    Discounts
                  </Text>
                </View>
                {discounts
                  .filter((discount) => discount.label && discount.amount)
                  .map((discount, index) => (
                    <View
                      className="flex-row items-center justify-between border-b-[1px] border-green-200"
                      key={`discount-${index}`}
                      style={{ padding: RFPercentage(1) }}
                    >
                      <Text
                        className="text-green-600 font-semibold w-[50%]"
                        style={{ fontSize: RFPercentage(1.5) }}
                      >
                        {discount.label}
                      </Text>
                      <Text
                        style={{
                          fontSize: RFPercentage(1.5),
                          color: "#16a34a",
                        }}
                      >
                        - ₹{" "}
                        {parseFloat(discount.amount)
                          .toFixed(2)
                          .toString()
                          .replace(commaRegEx, ",")}
                      </Text>
                    </View>
                  ))}
                <View
                  className="flex-row items-center justify-between border-b-[1px] border-primaryLight/20"
                  style={{ padding: RFPercentage(1) }}
                >
                  <Text
                    className="text-green-600 font-bold w-[50%]"
                    style={{ fontSize: RFPercentage(1.5) }}
                  >
                    Discounts Total
                  </Text>
                  <Text
                    style={{
                      fontSize: RFPercentage(1.5),
                      color: "#16a34a",
                      fontWeight: "bold",
                    }}
                  >
                    - ₹{" "}
                    {discountsTotal
                      .toFixed(2)
                      .toString()
                      .replace(commaRegEx, ",")}
                  </Text>
                </View>
              </>
            )}

          {/* Final Amount - Always at the bottom */}
          <View
            className="flex-row items-center justify-between rounded-xl"
            style={{
              backgroundColor: colors.surfaceAlt,
              padding: RFPercentage(1.5),
              marginTop: RFPercentage(1.5),
            }}
          >
            <Text
              className="font-bold w-[50%]"
              style={{ fontSize: RFPercentage(1.6), color: colors.primary }}
            >
              Final Amount
            </Text>
            <Text
              style={{
                fontSize: RFPercentage(1.8),
                color: getColor(
                  "Final Amount (GST + Making + Packing + Hallmarking)",
                ),
                fontWeight: "bold",
              }}
            >
              ₹{" "}
              {(
                Number(goldPlusWeight) +
                Number(gstCalculated) +
                (checked === "In Amount"
                  ? Number(makingCharges)
                  : Number((makingCharges * goldPlusWeight) / 100)) +
                Number(hallmarkCharges) +
                Number(packingCharges) +
                addOnsTotal -
                discountsTotal
              )
                .toFixed(2)
                .toString()
                .replace(commaRegEx, ",")}
            </Text>
          </View>

          <TouchableOpacity
            onPress={async () => {
              const finalAmount = (
                Number(goldPlusWeight) +
                Number(gstCalculated) +
                (checked === "In Amount"
                  ? Number(makingCharges)
                  : Number((makingCharges * goldPlusWeight) / 100)) +
                Number(hallmarkCharges) +
                Number(packingCharges) +
                addOnsTotal -
                discountsTotal
              ).toFixed(2);

              const addOnsHtml = addOns
                .filter((addon) => addon.label && addon.price)
                .map(
                  (addon) => `
                  <tr>
                    <td style="color: #4f3268;">${addon.label}</td>
                    <td style="color: #4f3268;">₹ ${parseFloat(addon.price).toFixed(2)}</td>
                  </tr>
                `,
                )
                .join("");

              const addOnsTotalHtml =
                addOns.length > 0 &&
                addOns.some((addon) => addon.label && addon.price)
                  ? `
                  <tr style="color: #4f3268;">
                    <td><strong>Add-Ons Total</strong></td>
                    <td><strong>₹ ${addOnsTotal.toFixed(2)}</strong></td>
                  </tr>
                `
                  : "";

              const discountsHtml = discounts
                .filter((discount) => discount.label && discount.amount)
                .map(
                  (discount) => `
                  <tr>
                    <td style="color: #16a34a;">${discount.label}</td>
                    <td style="color: #16a34a;">- ₹ ${parseFloat(discount.amount).toFixed(2)}</td>
                  </tr>
                `,
                )
                .join("");

              const discountsTotalHtml =
                discounts.length > 0 &&
                discounts.some((discount) => discount.label && discount.amount)
                  ? `
                  <tr style="color: #16a34a;">
                    <td><strong>Discounts Total</strong></td>
                    <td><strong>- ₹ ${discountsTotal.toFixed(2)}</strong></td>
                  </tr>
                `
                  : "";

              const html = `
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                    <style>
                      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; }
                      h1 { color: #4f3268; text-align: center; }
                      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                      th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                      th { background-color: #f8f5ff; color: #4f3268; }
                      tr:nth-child(even) { background-color: #f9f9f9; }
                      .total-row { font-weight: bold; background-color: #FDF5E6; }
                    </style>
                  </head>
                  <body>
                    <h1>Calculated Result</h1>
                    <table>
                      <tr>
                        <th>Description</th>
                        <th>Value</th>
                      </tr>
                      <tr>
                        <td>Gold Weight</td>
                        <td>${weight} ${weightUnit}</td>
                      </tr>
                      <tr>
                        <td>Gold Weight Amount (${carat}k)</td>
                        <td>₹ ${goldPlusWeight.toString().replace(commaRegEx, ",")}</td>
                      </tr>
                      <tr>
                        <td>Making Charges</td>
                        <td>${getMakingCharges}</td>
                      </tr>
                      <tr>
                        <td>Hallmarking Charges</td>
                        <td>₹ ${hallmarkCharges}</td>
                      </tr>
                      <tr>
                        <td>Packing Charges</td>
                        <td>₹ ${packingCharges}</td>
                      </tr>
                      <tr>
                        <td>GST</td>
                        <td>3% / ₹ ${gstCalculated.toString().replace(commaRegEx, ",")}</td>
                      </tr>
                      ${addOnsHtml}
                      ${addOnsTotalHtml}
                      ${discountsHtml}
                      ${discountsTotalHtml}
                      <tr class="total-row">
                        <td>Final Amount</td>
                        <td>₹ ${finalAmount.toString().replace(commaRegEx, ",")}</td>
                      </tr>
                    </table>
                  </body>
                </html>
              `;
              const { uri } = await printToFileAsync({ html });
              await shareAsync(uri, {
                UTI: ".pdf",
                mimeType: "application/pdf",
              });
            }}
            style={{
              marginTop: RFPercentage(2),
              backgroundColor: colors.primary,
              padding: RFPercentage(1.5),
              borderRadius: RFPercentage(1),
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: RFPercentage(2),
              }}
            >
              Print / Share PDF
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;
