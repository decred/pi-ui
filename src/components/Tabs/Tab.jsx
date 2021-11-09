import PropTypes from "prop-types";
import React from "react";
import { animated, useSpring } from "react-spring";
import { useTheme, getThemeProperty } from "../../theme";
import { classNames } from "../../utils";
import styles from "./styles.css";

const Tab = ({
  onSelect,
  tabIndex,
  isActive,
  className,
  style,
  label,
  count,
  mode,
  themes,
  ...props
}) => {
  const { theme } = useTheme();
  const handleOnClick = (e) => {
    e.preventDefault();
    onSelect(tabIndex);
  };
  const activeBorderColor = getThemeProperty(
    theme,
    themes?.tabActiveBorderColor || "tab-active-color"
  );
  const defaultBorderColor = getThemeProperty(
    theme,
    themes?.tabDefaultBorderColor || "tab-default-color"
  );
  const activeBackgroundColor = getThemeProperty(
    theme,
    themes?.tabActiveBackgroundColor || "tab-active-background"
  );
  const defaultBackgroundColor = getThemeProperty(
    theme,
    themes?.tabDefaultBackgroundColor || "tab-default-background"
  );
  const activeTextColor = getThemeProperty(
    theme,
    themes?.tabActiveTextColor || "tab-text-active-color"
  );
  const defaultTextColor = getThemeProperty(
    theme,
    themes?.tabDefaultTextColor || "tab-text-color"
  );
  const slide = useSpring({
    borderColor: isActive ? activeBorderColor : defaultBorderColor,
    color: isActive ? activeTextColor : defaultTextColor,
    backgroundColor: isActive ? activeBackgroundColor : defaultBackgroundColor,
    duration: 350
  });

  const dropdownMode = mode === "dropdown";
  const vertical = mode === "vertical";

  return (
    <animated.li
      className={classNames(
        vertical
          ? styles.tabVertical
          : dropdownMode
          ? styles.tabDropdownMode
          : styles.tabHorizontal,
        className
      )}
      style={{ ...slide, style }}
      onClick={handleOnClick}
      {...props}>
      <span className={styles.tabLabel} style={style}>
        {label}
      </span>
      {count >= 0 && <span className={styles.tabCount}>{count}</span>}
    </animated.li>
  );
};

Tab.propTypes = {
  onSelect: PropTypes.func,
  tabIndex: PropTypes.number,
  isActive: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  label: PropTypes.node,
  count: PropTypes.node,
  mode: PropTypes.oneOf(["horizontal", "vertical", "dropdown"]),
  themes: PropTypes.object
};

Tab.defaultProps = {
  mode: "horizontal"
};

export default Tab;
