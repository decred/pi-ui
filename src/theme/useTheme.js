import { useMemo, useLayoutEffect } from "react";
import deepmerge from "deepmerge";
import lightTheme from "./lightTheme";

import SourceSansProLight from "../assets/fonts/source_sans_pro/SourceSansPro-Light.ttf";
import SourceSansProRegular from "../assets/fonts/source_sans_pro/SourceSansPro-Regular.ttf";
import SourceSansProSemiBold from "../assets/fonts/source_sans_pro/SourceSansPro-SemiBold.ttf";

const useTheme = (themeOverrides, fontConfig) => {
  const res = useMemo(
    () =>
      lightTheme && themeOverrides
        ? deepmerge(lightTheme, themeOverrides)
        : lightTheme || themeOverrides,
    [lightTheme, themeOverrides]
  );

  const fontConfigMem = useMemo(() => {
    return {
      fontFamilyText: `Source Sans Pro`,
      regularUrl: SourceSansProRegular,
      semiBoldUrl: SourceSansProSemiBold,
      lightUrl: SourceSansProLight
    };
  }, [SourceSansProRegular, SourceSansProSemiBold, SourceSansProLight]);

  fontConfig = fontConfig || fontConfigMem;
  useLayoutEffect(() => {
    var newStyle = document.createElement("style");
    newStyle.appendChild(
      document.createTextNode(`
@font-face {
  font-family: ${fontConfig.fontFamilyText};
  src: url(${fontConfig.semiBoldUrl})
    format("truetype");
  font-weight: ${res["font-weight-semi-bold"]};
  font-style: normal;
}
@font-face {
  font-family: ${fontConfig.fontFamilyText};
  src: url(${fontConfig.lightUrl})
    format("truetype");
  font-weight: ${res["font-weight-light"]};
  font-style: normal;
}
@font-face {
  font-family: ${fontConfig.fontFamilyText};
  src: url(${fontConfig.regularUrl})
    format("truetype");
  font-weight: ${res["font-weight-regular"]};
  font-style: normal;
}
`)
    );
    newStyle.type = "text/css";
    document.head.appendChild(newStyle);
    Object.keys(res).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}`, res[key]);
    });
  }, [themeOverrides, fontConfig]);
  return res;
};

export default useTheme;
