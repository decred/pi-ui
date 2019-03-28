import React from "react";
import PropTypes from "prop-types";
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

  return (
    <li
      className={`${vertical ? styles.tabVertical : styles.tabHorizontal} ${
        isActive ? styles.active : ""
      } ${className}`}
      style={style}
      onClick={handleOnClick}
      {...props}>
      <span className={styles.tabLabel} style={style}>
        {label}
      </span>
      {count >= 0 && <span className={styles.tabCount}>{count}</span>}
    </li>
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
  className: "",
  vertical: false
};

export default Tab;
