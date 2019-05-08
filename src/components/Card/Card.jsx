import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Card = ({ children, className, style, paddingSize, ...props }) => (
  <div
    className={classNames(
      styles.card,
      styles[`padding-${paddingSize}`],
      className
    )}
    style={style}
    {...props}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  paddingSize: PropTypes.oneOf(["small", "medium", "large"]),
  style: PropTypes.object
};

export default Card;
