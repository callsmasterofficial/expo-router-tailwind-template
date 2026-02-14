import { RFPercentage } from "react-native-responsive-fontsize";
import {
  BuybackIcon,
  DiamondIcon,
  ExcellenceIcon,
  TransparencyIcon,
} from "../icons";

export default [
  {
    title: "Unwavering Quality Assurance",
    text: "Our commitment to excellence is reflected in the unwavering quality of our products, which have consistently met the high standards expected by our customers over the years. Every product undergoes a rigorous quality inspection before it is made available to our customers, ensuring reliability and fostering a trust that encourages them to return.",
    icon: <DiamondIcon size={RFPercentage(2)} color={"white"} fill={"white"} />,
  },
  {
    title: "Excellence Embodied by Our Brand",
    text: "With a rich history spanning over a decade, our brand stands at the forefront of the jewelry industry, distinguished by exceptional craftsmanship, unparalleled quality, and the glowing testimonials of our satisfied customers. This legacy of excellence propels us to sustain our esteemed status among the top jewelry brands.",
    icon: (
      <ExcellenceIcon size={RFPercentage(2)} color={"white"} fill={"white"} />
    ),
  },
  {
    title: "Commitment to Transparency",
    text: "Guided by a strong ethical framework and clear business policies, our brand is a beacon of integrity and transparency. We adhere to stringent standards of honesty and thorough scrutiny in all our dealings, ensuring that detailed information about every product, including size and weight, is readily accessible to our customers.",
    icon: (
      <TransparencyIcon size={RFPercentage(2)} color={"white"} fill={"white"} />
    ),
  },
  {
    title: "Lifetime Buyback Guarantee",
    text: "We honor the trust you place in us by offering a flexible buyback policy for the gold jewelry you purchase. Whether you choose to exchange your item for a new piece or prefer a refund based on its current market value, we are here to accommodate your needs, demonstrating our commitment to your satisfaction.",
    icon: <BuybackIcon size={RFPercentage(2)} color={"white"} fill={"white"} />,
  },
];
