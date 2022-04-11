import lightTheme from "./lightTheme";

function applyDefaultTheme() {
  Object.keys(lightTheme).forEach((key) => {
    document.documentElement.style.setProperty(`--${key}`, lightTheme[key]);
  });
}

applyDefaultTheme();
