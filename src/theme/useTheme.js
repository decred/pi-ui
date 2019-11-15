import { useMemo, useLayoutEffect } from "react";
import deepmerge from "deepmerge";
import lightTheme from "./lightTheme";

import SourceSansProLight from "../assets/fonts/source_sans_pro/SourceSansPro-Light.ttf";
import SourceSansProRegular from "../assets/fonts/source_sans_pro/SourceSansPro-Regular.ttf";
import SourceSansProSemiBold from "../assets/fonts/source_sans_pro/SourceSansPro-SemiBold.ttf";

const defaultFontSources = useMemo(() => {
  return {
    fontFamilyText: "Source Sans Pro",
    regularUrl: SourceSansProRegular,
    semiBoldUrl: SourceSansProSemiBold,
    lightUrl: SourceSansProLight
  };
});

const useTheme = (themeOverrides, fontSources = defaultFontSources) => {
  const res = useMemo(
    () =>
      lightTheme && themeOverrides
        ? deepmerge(lightTheme, themeOverrides)
        : lightTheme || themeOverrides,
    [lightTheme, themeOverrides]
  );
  useLayoutEffect(() => {
    Object.keys(res).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}`, res[key]);
    });

    document.documentElement.style = `
@font-face {
  font-family: ${fontSources.fontFamilyText};
  src: url(${fontSources.semiBold.url})
    format("ttf");
  font-weight: var(--font-weight-semi-bold);
  font-style: normal;
}

@font-face {
  font-family: ${fontSources.fontFamilyText};
  src: url(${fontSources.regular.url})
    format("ttf");
  font-weight: var(--font-weight-regular);
  font-style: normal;
}

@font-face {
  font-family: ${fontSources.fontFamilyText};
  src: url(${fontSources.light.url})
    format("ttf");
  font-weight: var(--font-weight-light);
  font-style: normal;
}
`;
  }, [themeOverrides, fontSources]);
  return res;
};

export default useTheme;
