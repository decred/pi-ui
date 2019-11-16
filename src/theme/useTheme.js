import { useMemo, useLayoutEffect } from "react";
import deepmerge from "deepmerge";
import lightTheme from "./lightTheme";

const useTheme = (themeOverrides, fontConfig) => {
  const res = useMemo(
    () =>
      lightTheme && themeOverrides
        ? deepmerge(lightTheme, themeOverrides)
        : lightTheme || themeOverrides,
    [lightTheme, themeOverrides]
  );

  useLayoutEffect(() => {
    if (fontConfig) {
      applyFonyAssets(fontConfig, res);
    }
    Object.keys(res).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}`, res[key]);
    });
  }, [themeOverrides, fontConfig]);
  return res;
};

const applyFonyAssets = (fontConfig, theme) => {
  var newStyle = document.createElement("style");
  newStyle.appendChild(
    document.createTextNode(`
@font-face {
  font-family: ${fontConfig.fontFamilyText};
  src: url(${fontConfig.semiBoldUrl})
    format("truetype");
  font-weight: ${theme["font-weight-semi-bold"]};
  font-style: normal;
}
@font-face {
  font-family: ${fontConfig.fontFamilyText};
  src: url(${fontConfig.lightUrl})
    format("truetype");
  font-weight: ${theme["font-weight-light"]};
  font-style: normal;
}
@font-face {
  font-family: ${fontConfig.fontFamilyText};
  src: url(${fontConfig.regularUrl})
    format("truetype");
  font-weight: ${theme["font-weight-regular"]};
  font-style: normal;
}
`)
  );
  newStyle.type = "text/css";
  document.head.appendChild(newStyle);
};

export default useTheme;
