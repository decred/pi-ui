import { useMemo, useLayoutEffect, useState } from "react";
import deepmerge from "deepmerge";
import lightTheme from "./lightTheme";

const useTheme = () => {
  const [theme, setTheme] = useState(null);
  const res = useMemo(
    () =>
      lightTheme && theme ? deepmerge(lightTheme, theme) : lightTheme || theme,
    [lightTheme, theme]
  );
  useLayoutEffect(() => {
    Object.keys(res).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}`, res[key]);
    });
    if (!theme) {
      setTheme(res);
    }
  }, [res, setTheme, theme]);
  return [theme, setTheme];
};

export default useTheme;
