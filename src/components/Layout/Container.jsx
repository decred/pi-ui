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
  bannerAndMainGap,
  singleContent,
  ...props
}) => {
  const topBannerRowHeight =
    typeof topBannerHeight !== "undefined" ? `${topBannerHeight}px` : "14rem";
  const headerRowHeight =
    typeof headerHeight !== "undefined" ? `${headerHeight}px` : "6rem";
  const mainAndBannerGapSize =
    typeof bannerAndMainGap !== "undefined" ? `${bannerAndMainGap}px` : "3rem";
  return (
    <div
      className={classNames(styles.container, className)}
      style={{
        gridTemplateRows: singleContent
          ? `6rem`
          : `${headerRowHeight} ${topBannerRowHeight} ${mainAndBannerGapSize}`,
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
  bannerAndMainGap: PropTypes.number,
  style: PropTypes.object,
  singleContent: PropTypes.bool,
  className: PropTypes.string
};

Container.defaultProps = {
  singleContent: false
};

export default Container;
