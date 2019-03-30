import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const Header = ({ children, style, className, ...props }) => {
  return (
    <div className={`${styles.header} ${className}`} style={style} {...props}>
      {children}
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

Header.defaultProps = {
  className: ""
};

export default Header;
