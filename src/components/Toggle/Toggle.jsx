import React from "react";
import PropTypes from "prop-types";
import { useTheme, getThemeProperty } from "../../theme";
import { animated, useSpring, interpolate } from "react-spring";

import styles from "./styles.css";

const Toggle = ({ onToggle, checked }) => {
  const { theme } = useTheme();
  const { backgroundColor, x, borderColor, borderWidth } = useSpring({
    x: checked ? 1 : 0,
    backgroundColor: checked
      ? getThemeProperty(theme, "color-primary")
      : getThemeProperty(theme, "color-white"),
    borderColor: checked
      ? getThemeProperty(theme, "color-white")
      : getThemeProperty(theme, "color-gray-light"),
    borderWidth: checked ? 0 : 2
  });

  return (
    <div className={styles.toggle} onClick={onToggle}>
      <div className={styles.switch}>
        <animated.div
          className={styles.circle}
          style={{
            transform: x
              .interpolate({
                range: [0, 0.4, 0.8, 1],
                output: [0, 10, 20, 25]
              })
              .interpolate((x) => `translateX(${x}px)`),
            backgroundColor,
            border: interpolate(
              [borderWidth, borderColor],
              (bw, bc) => `${bw}px solid ${bc}`
            )
          }}>
          &nbsp;
        </animated.div>
        <div className={styles.bar}>&nbsp;</div>
      </div>
    </div>
  );
};

Toggle.propTypes = {
  onToggle: PropTypes.func,
  checked: PropTypes.bool.isRequired
};

export default Toggle;
