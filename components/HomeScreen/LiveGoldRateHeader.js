import { Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import { useTheme } from "../../constants/ThemeContext";

const LiveGoldRateHeader = () => {
  const { colors } = useTheme();
  const data = useSelector((state) => state.goldRateTime);
  const bidchange = useSelector((state) => state.goldRate.goldIncDec);
  const currentGoldRate = useSelector((state) => state.goldRate);
  const currentSilverRate = useSelector((state) => state.silverRate);

  let date = new Date();
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  if (dayName.slice(0, dayName.indexOf(",")) === "Saturday") {
    date.setDate(date.getDate() - 1);
  } else if (
    dayName.slice(0, dayName.slice(0, dayName.indexOf(","))) === "Sunday"
  ) {
    date.setDate(date.getDate() - 2);
  }

  let currentDay = String(date.getDate()).padStart(2, "0");
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();
  let currentDate = `${currentDay}/${currentMonth}/${currentYear}`;

  function getColor(defaultColor) {
    if (bidchange === "green") return "#22c55e";
    if (bidchange === "red") return "#ef4444";
    return defaultColor;
  }

  const goldRates = [
    { carat: "24K", purity: "999", rate: currentGoldRate.discounted24k },
    { carat: "22K", purity: "916", rate: currentGoldRate.discounted22k },
    { carat: "18K", purity: "750", rate: currentGoldRate.discounted18k },
    { carat: "14K", purity: "583", rate: currentGoldRate.discounted14k },
    { carat: "9K", purity: "375", rate: currentGoldRate.discounted9k },
  ];

  const silverRates = [
    { carat: "999", purity: "Pure", rate: currentSilverRate.discounted24k },
    { carat: "925", purity: "Sterling", rate: currentSilverRate.discounted22k },
  ];

  const TableHeader = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.primary,
        paddingVertical: RFPercentage(1.8),
        paddingHorizontal: RFPercentage(3.5),
        borderTopLeftRadius: RFPercentage(1.5),
        borderTopRightRadius: RFPercentage(1.5),
      }}
    >
      <Text
        style={{
          fontSize: RFPercentage(1.5),
          fontWeight: "700",
          color: colors.accent,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Carat
      </Text>
      <Text
        style={{
          fontSize: RFPercentage(1.5),
          fontWeight: "700",
          color: colors.accent,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Rate / 10g
      </Text>
    </View>
  );

  const TableRow = ({ item, index, isLast }) => {
    const isEven = index % 2 === 0;
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: isEven ? colors.surface : colors.surfaceAlt,
            paddingVertical: RFPercentage(2),
            paddingHorizontal: RFPercentage(3.5),
            borderBottomLeftRadius: isLast ? RFPercentage(1.5) : 0,
            borderBottomRightRadius: isLast ? RFPercentage(1.5) : 0,
            borderBottomWidth: isLast ? 0 : 1,
            borderBottomColor: colors.borderLight,
          }}
        >
          {/* Carat Column */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: RFPercentage(1.5),
                paddingVertical: RFPercentage(0.7),
                borderRadius: RFPercentage(1),
                minWidth: RFPercentage(7.5),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: RFPercentage(1.6),
                  fontWeight: "bold",
                  color: colors.accent,
                  letterSpacing: 0.5,
                }}
              >
                {item.carat}
              </Text>
            </View>
          </View>

          {/* Rate Column */}
          <Text
            style={{
              fontSize: RFPercentage(2),
              fontWeight: "bold",
              color: getColor(colors.text),
              letterSpacing: 0.5,
            }}
          >
            {item.rate > 0 ? `₹ ${item.rate.toLocaleString("en-IN")}` : "—"}
          </Text>
        </View>
        {item.carat === "24K" && (
          <View
            style={{
              backgroundColor: colors.accent,
              paddingVertical: RFPercentage(1),
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1,
              elevation: 2,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: RFPercentage(1.4),
                color: colors.primary,
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Our Showroom Discounted Rates
            </Text>
          </View>
        )}
      </View>
    );
  };

  const SectionTitle = ({ title, icon }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: RFPercentage(1),
        marginTop: RFPercentage(1.5),
      }}
    >
      <Text
        style={{
          fontSize: RFPercentage(1.2),
          fontWeight: "600",
          color: colors.subtext,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {icon} {title}
      </Text>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: colors.border,
          marginLeft: RFPercentage(1),
        }}
      />
    </View>
  );

  return (
    <View style={{ backgroundColor: colors.background }}>
      {/* Main Header */}
      <View
        style={{
          backgroundColor: colors.primary,
          paddingVertical: RFPercentage(1.5),
          paddingHorizontal: RFPercentage(2),
        }}
      >
        <Text
          style={{
            fontSize: RFPercentage(1.8),
            fontWeight: "700",
            color: colors.accent,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Live Hallmark Rates
        </Text>
        <Text
          style={{
            fontSize: RFPercentage(1.2),
            color: "rgba(253,245,230,0.7)",
            textAlign: "center",
            marginTop: RFPercentage(0.3),
          }}
        >
          {data.updateTime
            ? `Updated: ${currentDate} • ${data.updateTime}`
            : "Fetching latest rates..."}
        </Text>
      </View>

      {/* Content Container */}
      <View
        style={{
          paddingHorizontal: RFPercentage(1.5),
          paddingBottom: RFPercentage(1.5),
        }}
      >
        {/* Gold Section */}
        <SectionTitle title="Gold Rates (per 10g)" icon="🥇" />
        <View
          style={{
            borderRadius: RFPercentage(1),
            overflow: "hidden",
            shadowColor: colors.cardShadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <TableHeader />
          {goldRates.map((item, index) => (
            <TableRow
              key={item.carat}
              item={item}
              index={index}
              isLast={index === goldRates.length - 1}
            />
          ))}
        </View>

        {/* Silver Section */}
        <SectionTitle title="Silver Rates (per 10g)" icon="🥈" />
        <View
          style={{
            borderRadius: RFPercentage(1),
            overflow: "hidden",
            shadowColor: colors.cardShadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <TableHeader />
          {silverRates.map((item, index) => (
            <TableRow
              key={item.carat}
              item={item}
              index={index}
              isLast={index === silverRates.length - 1}
            />
          ))}
        </View>

        {/* Footer Note */}
        {/* <View
          style={{
            marginTop: RFPercentage(1.5),
            paddingHorizontal: RFPercentage(0.5),
          }}
        >
          <Text
            style={{
              fontSize: RFPercentage(1.1),
              color: colors.subtext,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            * Rates are inclusive of making charges.
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default LiveGoldRateHeader;
