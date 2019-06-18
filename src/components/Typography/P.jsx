import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const P = ({ children, className, style }) => (
  <p className={classNames(styles.paragraph, className)} style={style}>
    {children}
  </p>
);

P.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

export default P;
