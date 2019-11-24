import { useLayoutEffect, useState, useEffect } from "react";
import deepmerge from "deepmerge";
import lightTheme from "./lightTheme";

let listeners = [];
let theme = null;

const setTheme = (newTheme) => {
  theme = { ...theme, ...newTheme };
  listeners.forEach((listener) => {
    listener(theme);
  });
};

const useTheme = () => {
  const [, newListener] = useState(null);
  useEffect(() => {
    listeners.push(newListener);
    return () => {
      listeners = listeners.filter((listener) => listener !== newListener);
    };
  }, []);
  useLayoutEffect(() => {
    if (theme) {
      const cssVars = deepmerge(lightTheme, theme);
      Object.keys(cssVars).forEach((key) => {
        document.documentElement.style.setProperty(`--${key}`, cssVars[key]);
      });
    }
  }, [theme]);
  return [theme, setTheme];
};

export default useTheme;
