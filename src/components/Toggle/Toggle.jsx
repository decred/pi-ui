import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme, getThemeProperty } from "../../theme";
import { animated, useSpring, interpolate } from "react-spring";

import styles from "./styles.css";

const Toggle = ({ onToggle, label }) => {
  const [checked, setChecked] = useState(false);
  const theme = useTheme();

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

  const onSwitcClickhHandler = () => {
    setChecked(!checked);
    onToggle && onToggle();
  };

  return (
    <div className={styles.toggle} onClick={onSwitcClickhHandler}>
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
      <div className={styles.label}>{label}</div>
    </div>
  );
};

Toggle.propTypes = {
  onToggle: PropTypes.func,
  label: PropTypes.string.isRequired
};

export default Toggle;
