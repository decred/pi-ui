import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Main = ({ children, style, className, fill, ...props }) => {
  return (
    <div
      className={classNames(styles.main, fill && styles.mainfill, className)}
      style={style}
      {...props}>
      {children}
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  fill: PropTypes.bool,
  className: PropTypes.string
};

export default Main;
