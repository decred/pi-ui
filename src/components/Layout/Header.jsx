import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Header = ({ children, style, className, ...props }) => {
  return (
    <div
      className={classNames(styles.header, className)}
      style={style}
      {...props}>
      {children}
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Header;
