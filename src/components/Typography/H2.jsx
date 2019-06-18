import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const H2 = ({ children, className, style }) => (
  <h2 className={classNames(styles.header2, className)} style={style}>
    {children}
  </h2>
);

H2.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

export default H2;
