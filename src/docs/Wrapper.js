import { useTheme, defaultLightTheme } from "../index";

const DoczWrapper = ({ children }) => {
  useTheme(defaultLightTheme);
  return children;
};

export default DoczWrapper;
