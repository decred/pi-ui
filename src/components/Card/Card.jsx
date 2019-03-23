import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const Card = ({ children, className, ...props }) => (
  <div className={`${styles.card} ${className}`} {...props}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string
};

Card.defaultProps = {
  className: ""
};

export default Card;
