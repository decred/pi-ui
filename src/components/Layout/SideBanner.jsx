import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const SearchBox = ({ children, style, className, ...props }) => {
  return (
    <div
      className={classNames(styles.sideBanner, className)}
      style={style}
      {...props}>
      {children}
    </div>
  );
};

SearchBox.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

export default SearchBox;
