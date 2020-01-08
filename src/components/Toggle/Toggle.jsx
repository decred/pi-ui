import React from "react";
import PropTypes from "prop-types";
import { useTheme, getThemeProperty } from "../../theme";
import { animated, useSpring, interpolate } from "react-spring";

import styles from "./styles.css";

const Toggle = ({ onToggle, toggled }) => {
  const { theme } = useTheme();
  const { backgroundColor, x, borderColor, borderWidth } = useSpring({
    x: toggled ? 1 : 0,
    backgroundColor: toggled
      ? getThemeProperty(theme, "color-primary")
      : getThemeProperty(theme, "color-white"),
    borderColor: toggled
      ? getThemeProperty(theme, "color-white")
      : getThemeProperty(theme, "color-gray-light"),
    borderWidth: toggled ? 0 : 2
  });

  return (
    <div className={styles.switch} onClick={onToggle}>
      <animated.div
        className={styles.circle}
        style={{
          transform: x
            .interpolate({
              range: [0, 0.4, 0.8, 1],
              output: [0, 5, 10, 15]
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
  );
};

Toggle.propTypes = {
  onToggle: PropTypes.func,
  toggled: PropTypes.bool.isRequired
};

export default Toggle;
