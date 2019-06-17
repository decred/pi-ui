import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const H4 = ({ children, className, style }) => (
  <h4 className={classNames(styles.header4, className)} style={style}>
    {children}
  </h4>
);

H4.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

export default H4;
