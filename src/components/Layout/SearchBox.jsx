import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const SearchBox = ({ children, style, className, ...props }) => {
  return (
    <div
      className={`${styles.searchBox} ${className}`}
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

SearchBox.defaultProps = {
  className: ""
};

export default SearchBox;
