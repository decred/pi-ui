import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const H3 = ({ children, className, style }) => (
  <h3 className={classNames(styles.header3, className)} style={style}>
    {children}
  </h3>
);

H3.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

export default H3;
