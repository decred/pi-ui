import { useMemo, useLayoutEffect, useState } from "react";
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
  const [theme, setTheme] = useState(res);
  useLayoutEffect(() => {
    Object.keys(theme).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });
  }, [themeOverrides]);
  return [theme, setTheme];
};

export default useTheme;
