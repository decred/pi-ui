import React from "react";
import PropTypes from "prop-types";

import { ThemeProvider, defaultLightTheme } from "../index";
import SourceSansProLight from "../assets/fonts/source-sans-pro/SourceSansPro-Light.ttf";
import SourceSansProRegular from "../assets/fonts/source-sans-pro/SourceSansPro-Regular.ttf";
import SourceSansProSemiBold from "../assets/fonts/source-sans-pro/SourceSansPro-SemiBold.ttf";

const themeCustomVariables = {
  "font-family-text": "Source Sans Pro"
};

const fonts = [
  {
    "font-family": "Source Sans Pro",
    src: `url(${SourceSansProLight}) format("truetype")`,
    "font-weight": defaultLightTheme["font-weight-light"], // 300
    "font-style": "normal",
    "font-display": "swap"
  },
  {
    "font-family": "Source Sans Pro",
    src: `url(${SourceSansProRegular}) format("truetype")`,
    "font-weight": defaultLightTheme["font-weight-regular"], // 400
    "font-style": "normal",
    "font-display": "swap"
  },
  {
    "font-family": "Source Sans Pro",
    src: `url(${SourceSansProSemiBold}) format("truetype")`,
    "font-weight": defaultLightTheme["font-weight-semi-bold"], // 600
    "font-style": "normal",
    "font-display": "swap"
  }
];

const DoczWrapper = ({ children }) => {
  return (
    <ThemeProvider
      themes={{ light: { ...defaultLightTheme, ...themeCustomVariables } }}
      defaultThemeName="light"
      fonts={fonts}>
      {children}
    </ThemeProvider>
  );
};

DoczWrapper.propTypes = {
  children: PropTypes.node
};

export default DoczWrapper;
