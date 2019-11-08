import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Container = ({
  children,
  style,
  className,
  topBannerHeight,
  headerHeight,
  singleContent,
  ...props
}) => {
  const headerRowHeight = headerHeight ? `${headerHeight}px` : "6rem";
  return (
    <div
      className={classNames(styles.container, className)}
      style={{
        gridTemplateRows: singleContent
          ? `6rem`
          : `${headerRowHeight} ${topBannerHeight}px 3rem`,
        ...style
      }}
      {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  topBannerHeight: PropTypes.number,
  headerHeight: PropTypes.number,
  style: PropTypes.object,
  singleContent: PropTypes.bool,
  className: PropTypes.string
};

Container.defaultProps = {
  topBannerHeight: 140,
  singleContent: false
};

export default Container;
