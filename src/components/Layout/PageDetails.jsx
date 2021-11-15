import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const PageDetails = ({ children, style, className, ...props }) => {
  return (
    <div
      className={classNames(styles.pageDetails, className)}
      style={style}
      {...props}>
      {children}
    </div>
  );
};

PageDetails.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default PageDetails;
