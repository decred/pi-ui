import React from "react";
import { classNames } from "../../utils";
import styles from "./styles.module.css";

const StaticContainer = ({ children, className, style }) => (
  <div className={classNames(styles.staticContainer, className)} style={style}>
    {children}
  </div>
);

export default StaticContainer;
