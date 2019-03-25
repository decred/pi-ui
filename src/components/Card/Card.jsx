import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const Card = ({ children, className, style, ...props }) => (
  <div className={`${styles.card} ${className}`} style={style} {...props}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

Card.defaultProps = {
  className: ""
};

export default Card;
