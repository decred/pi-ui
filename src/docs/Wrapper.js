import { useTheme, defaultLightTheme, useFont } from "../index";
import SourceSansProLight from "../assets/fonts/source-sans-pro/SourceSansPro-Light.ttf";
import SourceSansProRegular from "../assets/fonts/source-sans-pro/SourceSansPro-Regular.ttf";
import SourceSansProSemiBold from "../assets/fonts/source-sans-pro/SourceSansPro-SemiBold.ttf";

const fontConfig = {
  fontFamilyText: "Source Sans Pro",
  regularUrl: SourceSansProRegular,
  semiBoldUrl: SourceSansProSemiBold,
  lightUrl: SourceSansProLight,
  format: "truetype"
};

const DoczWrapper = ({ children }) => {
  useTheme(defaultLightTheme);
  useFont(fontConfig);
  return children;
};

export default DoczWrapper;
