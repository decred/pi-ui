import React from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import { useTheme, getThemeProperty } from "../../theme";

import styles from "./styles.css";

const DarkLightToggle = ({ onToggle, toggled }) => {
  const { theme } = useTheme();
  const colorBlueDarkest = getThemeProperty(theme, "color-blue-darkest")
  const colorBlueLightDark = getThemeProperty(theme, "color-blue-light-dark")
  const { rectFill, cx, cFill, lightOpacity, darkOpacity } = useSpring({
    to: {
      rectFill: getThemeProperty(
        theme,
        toggled ? "color-blue-darkest" : "color-gray-light"
      ),
      cx: toggled ? 39 : 13,
      cFill: getThemeProperty(theme, toggled ? "color-primary" : "color-gray"),
      lightOpacity: toggled ? 0 : 1,
      darkOpacity: toggled ? 1 : 0
    },
    delay: 200
  });

  return (
    <svg
      className={styles.darkLightToggle}
      onClick={onToggle}
      width="52"
      height="26"
      viewBox="0 0 52 26"
      fill="none">
      <animated.rect
        y="2.78571"
        width="52"
        height="20.4286"
        rx="10.2143"
        fill={rectFill}
      />
      <animated.circle cx={cx} cy="13" r="13" fill={cFill} />
      <animated.g opacity={lightOpacity}>
        <path
          d="M13 19C16.3137 19 19 16.3137 19 13C19 9.68626 16.3137 6.99997 13 6.99997C9.68629 6.99997 7 9.68626 7 13C7 16.3137 9.68629 19 13 19Z"
          fill="white"
        />
        <path
          d="M4.436 13.4204H6V12.5844H4.4C4.18 12.5844 4 12.7644 4 12.9844C4 13.2244 4.196 13.4204 4.436 13.4204Z"
          fill={colorBlueDarkest}
        />
        <path
          d="M21.564 12.58H20V13.416H21.6C21.82 13.416 22 13.236 22 13.016C22 12.776 21.804 12.58 21.564 12.58Z"
          fill={colorBlueDarkest}
        />
        <path
          d="M13.4198 21.564V20H12.5838V21.6C12.5838 21.82 12.7638 22 12.9838 22C13.2238 22 13.4198 21.804 13.4198 21.564Z"
          fill={colorBlueDarkest}
        />
        <path
          d="M12.5808 4.436V6H13.4168V4.4C13.4168 4.18 13.2368 4 13.0168 4C12.7768 4 12.5808 4.196 12.5808 4.436Z"
          fill={colorBlueDarkest}
        />
        <path
          d="M19.3533 18.7599L18.2493 17.6559L17.6573 18.2479L18.7893 19.3799C18.9453 19.5359 19.1973 19.5359 19.3533 19.3799C19.5213 19.2079 19.5213 18.9319 19.3533 18.7599Z"
          fill={colorBlueDarkest}
        />
        <path
          d="M6.64714 7.24026L7.75115 8.34426L8.34315 7.75226L7.21514 6.62426C7.05914 6.46826 6.80714 6.46826 6.65114 6.62426C6.47914 6.79226 6.47914 7.06826 6.64714 7.24026Z"
          fill={colorBlueDarkest}
        />
        <path
          d="M7.24039 19.352L8.34439 18.2479L7.75239 17.6559L6.62039 18.788C6.46439 18.944 6.46439 19.196 6.62039 19.352C6.79239 19.52 7.06839 19.52 7.24039 19.352Z"
          fill={colorBlueDarkest}
        />
        <path
          d="M18.7613 6.64797L17.6573 7.75197L18.2493 8.34397L19.3813 7.21197C19.5373 7.05597 19.5373 6.80397 19.3813 6.64797C19.2093 6.47997 18.9333 6.47997 18.7613 6.64797Z"
          fill={colorBlueDarkest}
        />
      </animated.g>
      <animated.g opacity={darkOpacity}>
        <path
          d="M39.0001 19.9999C42.8661 19.9999 46.0001 16.8659 46.0001 12.9999C46.0001 9.13395 42.8661 5.99994 39.0001 5.99994C35.1341 5.99994 32.0001 9.13395 32.0001 12.9999C32.0001 16.8659 35.1341 19.9999 39.0001 19.9999Z"
          fill={colorBlueLightDark}
        />
        <path
          d="M41.8785 16.4116C38.4025 16.4116 35.5825 13.5956 35.5825 10.1156C35.5825 9.39962 35.7025 8.71562 35.9225 8.07562C34.2665 9.09962 33.1625 10.9316 33.1625 13.0196C33.1625 16.2276 35.7625 18.8276 38.9705 18.8276C41.0585 18.8276 42.8905 17.7236 43.9145 16.0676C43.2785 16.2916 42.5945 16.4116 41.8785 16.4116Z"
          fill={colorBlueDarkest}
        />
      </animated.g>
    </svg>
  );
};

DarkLightToggle.propTypes = {
  onToggle: PropTypes.func,
  toggled: PropTypes.bool.isRequired
};

export default DarkLightToggle;
