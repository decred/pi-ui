import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const H1 = ({ children, className, style }) => (
  <h1 className={classNames(styles.header1, className)} style={style}>
    {children}
  </h1>
);

H1.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default H1;
