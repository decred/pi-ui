import PropTypes from "prop-types";
import React from "react";
import { classNames } from "../../utils";
import styles from "./styles.module.css";

const Card = ({
  children,
  className,
  style,
  paddingSize,
  marker,
  markerColor,
  ...props
}) => (
  <div
    className={classNames(
      styles.card,
      styles[`padding-${paddingSize}`],
      className
    )}
    style={style}
    {...props}>
    {marker && (
      <div
        className={styles.marker}
        style={{
          borderLeftColor: markerColor,
          borderTopColor: markerColor,
        }}
      />
    )}
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  paddingSize: PropTypes.oneOf(["small", "medium", "large"]),
  marker: PropTypes.bool,
  markerColor: PropTypes.string,
  style: PropTypes.object,
};

Card.defaultProps = {
  markerColor: "var(--color-yellow)",
};

export default Card;
