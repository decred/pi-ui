import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { classNames } from "../../utils";

const TopBanner = ({ children, style, className, ...props }) => {
  return (
    <div
      className={classNames(styles.topBanner, className)}
      style={style}
      {...props}>
      {children}
    </div>
  );
};

TopBanner.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default TopBanner;
