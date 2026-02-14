import { Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";

const LiveGoldRateHeader = () => {
  const data = useSelector((state) => state.goldRateTime);
  const bidchange = useSelector((state) => state.goldRate.goldIncDec);
  const currentGoldRate = useSelector((state) => state.goldRate);
  console.log({ currentGoldRate })
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

  // Calculate rates with 3% GST
  const calculateGST = (rate) => {
    if (!rate || rate <= 0) return null;
    return Math.round(rate * 1.03);
  };

  // Gold rates data
  const goldRates = [
    { carat: "24K", purity: "999", rate: currentGoldRate.discounted24k },
    { carat: "22K", purity: "916", rate: currentGoldRate.discounted22k },
    { carat: "18K", purity: "750", rate: currentGoldRate.discounted18k },
    { carat: "14K", purity: "583", rate: currentGoldRate.discounted14k },
  ];

  // Silver rates data
  const silverRates = [
    { carat: "999", purity: "Pure", rate: currentSilverRate.discounted24k },
    { carat: "925", purity: "Sterling", rate: currentSilverRate.discounted22k },
  ];

  // Table Header Component
  const TableHeader = () => (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#702963",
        paddingVertical: RFPercentage(1.2),
        paddingHorizontal: RFPercentage(1.5),
        borderTopLeftRadius: RFPercentage(1),
        borderTopRightRadius: RFPercentage(1),
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: RFPercentage(1.4),
            fontWeight: "600",
            color: "#FFD700",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Carat
        </Text>
      </View>
      <View style={{ flex: 1.2, alignItems: "center" }}>
        <Text
          style={{
            fontSize: RFPercentage(1.4),
            fontWeight: "600",
            color: "#FFD700",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Rate/10g
        </Text>
      </View>
      <View style={{ flex: 1.2, alignItems: "flex-end" }}>
        <Text
          style={{
            fontSize: RFPercentage(1.4),
            fontWeight: "600",
            color: "#FFD700",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          +3% GST
        </Text>
      </View>
    </View>
  );

  // Table Row Component
  const TableRow = ({ item, index, isLast }) => {
    const gstRate = calculateGST(item.rate);
    const isEven = index % 2 === 0;

    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: isEven ? "#ffffff" : "#f8fafc",
          paddingVertical: RFPercentage(1.4),
          paddingHorizontal: RFPercentage(1.5),
          borderBottomLeftRadius: isLast ? RFPercentage(1) : 0,
          borderBottomRightRadius: isLast ? RFPercentage(1) : 0,
          borderBottomWidth: isLast ? 0 : 1,
          borderBottomColor: "#e2e8f0",
        }}
      >
        {/* Carat Column */}
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "#702963",
              paddingHorizontal: RFPercentage(1),
              paddingVertical: RFPercentage(0.5),
              borderRadius: RFPercentage(0.6),
            }}
          >
            <Text
              style={{
                fontSize: RFPercentage(1.5),
                fontWeight: "700",
                color: "#FFD700",
              }}
            >
              {item.carat}
            </Text>
          </View>
        </View>

        {/* Base Rate Column */}
        <View style={{ flex: 1.2, alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: RFPercentage(1.6),
              fontWeight: "600",
              color: getColor("#1e293b"),
            }}
          >
            {item.rate > 0 ? `₹${item.rate.toLocaleString("en-IN")}` : "—"}
          </Text>
        </View>

        {/* GST Rate Column */}
        <View style={{ flex: 1.2, alignItems: "flex-end", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: RFPercentage(1.6),
              fontWeight: "600",
              color: getColor("#1e293b"),
            }}
          >
            {gstRate ? `₹${gstRate.toLocaleString("en-IN")}` : "—"}
          </Text>
        </View>
      </View>
    );
  };

  // Section Title Component
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
          color: "#64748b",
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
          backgroundColor: "#e2e8f0",
          marginLeft: RFPercentage(1),
        }}
      />
    </View>
  );

  return (
    <View style={{ backgroundColor: "#f1f5f9" }}>
      {/* Main Header */}
      <View
        style={{
          backgroundColor: "#702963",
          paddingVertical: RFPercentage(1.5),
          paddingHorizontal: RFPercentage(2),
        }}
      >
        <Text
          style={{
            fontSize: RFPercentage(1.8),
            fontWeight: "700",
            color: "#FFD700",
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
            color: "#94a3b8",
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
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
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
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
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
        <View
          style={{
            marginTop: RFPercentage(1.5),
            paddingHorizontal: RFPercentage(0.5),
          }}
        >
          <Text
            style={{
              fontSize: RFPercentage(1.1),
              color: "#94a3b8",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            * Rates are inclusive of making charges. GST @3% applied on total value.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LiveGoldRateHeader;
