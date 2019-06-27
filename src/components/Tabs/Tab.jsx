import PropTypes from "prop-types";
import React from "react";
import { animated, useSpring } from "react-spring";
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
  vertical,
  ...props
}) => {
  const handleOnClick = (e) => {
    e.preventDefault();
    onSelect(tabIndex);
  };

  const slide = useSpring({
    borderColor: isActive ? "#ffc84e" : "#fff",
    color: isActive ? "#091440" : "#3d5873",
    duration: 350
  });

  return (
    <animated.li
      className={classNames(
        vertical ? styles.tabVertical : styles.tabHorizontal,
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
  onSelect: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  label: PropTypes.string,
  count: PropTypes.number,
  vertical: PropTypes.bool
};

Tab.defaultProps = {
  vertical: false
};

export default Tab;
