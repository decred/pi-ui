import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { classNames } from "../../utils";

const DefaultLinkComponent = React.forwardRef(({ children, ...props }, ref) => (
  <a {...props} ref={ref}>
    {children}
  </a>
));

DefaultLinkComponent.propTypes = {
  children: PropTypes.node,
};

const Link = React.forwardRef(
  (
    {
      gray,
      dark,
      className,
      customComponent,
      children,
      noHoverEffect,
      truncate,
      ...props
    },
    ref
  ) => {
    const Comp = customComponent || DefaultLinkComponent;
    return (
      <Comp
        ref={ref}
        className={classNames(
          styles.link,
          gray && styles.gray,
          dark && styles.dark,
          noHoverEffect && styles.noHover,
          truncate && styles.truncate,
          className
        )}
        {...props}>
        {children}
      </Comp>
    );
  }
);

Link.propTypes = {
  customComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.node,
  gray: PropTypes.bool,
  dark: PropTypes.bool,
  className: PropTypes.string,
  noHoverEffect: PropTypes.bool,
  truncate: PropTypes.bool,
};

Link.defaultProps = {
  customComponent: null,
};

export default Link;
