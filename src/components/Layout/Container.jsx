import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Container = ({
  children,
  style,
  className,
  topBannerHeight,
  ...props
}) => {
  return (
    <div
      className={classNames(styles.container, className)}
      style={{
        gridTemplateRows: `6rem ${topBannerHeight}px 3rem minmax(30rem, max-content)`,
        ...style
      }}
      {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

Container.defaultProps = {
  topBannerHeight: 140
};

export default Container;
