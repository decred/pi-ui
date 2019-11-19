import { useMemo, useLayoutEffect } from "react";
import deepmerge from "deepmerge";
import lightTheme from "./lightTheme";

const useTheme = (themeOverrides) => {
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
  }, [themeOverrides]);
  return res;
};

export default useTheme;
