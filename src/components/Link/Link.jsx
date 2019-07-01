import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const DefaultLinkComponent = ({ children, ...props }) => (
  <a {...props}>{children}</a>
);

DefaultLinkComponent.propTypes = {
  children: PropTypes.node
};

const Link = ({
  gray,
  className,
  customComponent,
  children,
  noHoverEffect,
  ...props
}) => {
  const Comp = customComponent || DefaultLinkComponent;
  return (
    <Comp
      className={classNames(
        styles.link,
        gray && styles.gray,
        noHoverEffect && styles.noHover,
        className
      )}
      {...props}>
      {children}
    </Comp>
  );
};

Link.propTypes = {
  customComponent: PropTypes.node,
  children: PropTypes.node,
  gray: PropTypes.bool,
  className: PropTypes.string,
  noHoverEffect: PropTypes.bool
};

export default Link;
