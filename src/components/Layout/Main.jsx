import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Main = ({ children, style, className, ...props }) => {
  return (
    <div
      className={classNames(styles.main, className)}
      style={style}
      {...props}>
      {children}
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

export default Main;
