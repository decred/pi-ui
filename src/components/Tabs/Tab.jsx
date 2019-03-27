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
  ...props
}) => {
  const handleOnClick = (e) => {
    e.preventDefault();
    onSelect(tabIndex);
  };

  return (
    <li
      className={`${isActive ? styles.tabActive : styles.tab} ${className}`}
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
  count: PropTypes.number
};

Tab.defaultProps = {
  className: ""
};

export default Tab;
