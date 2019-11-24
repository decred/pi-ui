import React from "react";
import PropTypes from "prop-types";

import { ThemeProvider, defaultLightTheme } from "../index";
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
  return (
    <ThemeProvider
      themes={{ light: defaultLightTheme }}
      defaultThemeName="light"
      fontConfig={fontConfig}>
      {children}
    </ThemeProvider>
  );
};

DoczWrapper.propTypes = {
  children: PropTypes.node
};

export default DoczWrapper;
