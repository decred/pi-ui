import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";
import { useTheme } from "../../theme";
import Tooltip from "../Tooltip/Tooltip.jsx";

const StatusBar = ({
  status,
  markerPosition,
  markerTooltipText,
  markerTooltipClassName,
  max,
  showMarker,
  renderStatusInfoComponent,
  className,
  decimalPlaces
}) => {
  const currenttotal = status.reduce((acc, cur) => acc + cur.amount, 0);
  const totalPercentage = max ? (currenttotal / max) * 100 : 100;
  const maxWidth = Math.min(100, totalPercentage);
  const statusWithPercentages = status.map((item) => {
    const fraction = item.amount ? item.amount / currenttotal : 0;
    const percentage = (fraction * 100).toFixed(decimalPlaces);
    const widthPercentage = fraction * maxWidth;
    return {
      ...item,
      percentage,
      widthPercentage
    };
  });

  const { themeName } = useTheme();
  const isDarkTheme = themeName === "dark";

  const createInfoComp = (props) =>
    renderStatusInfoComponent ? (
      React.cloneElement(renderStatusInfoComponent, props)
    ) : (
      <DefaultInfoComp {...props} />
    );
  return (
    <div className={classNames(styles.statusBar, className)}>
      <div className={styles.statusInfo}>
        <div className={styles.legend}>
          {statusWithPercentages.map((st, i) => (
            <div className={styles.legendLine} key={i + Math.random()}>
              <div
                style={{ backgroundColor: st.color }}
                className={styles.legendColor}
              />
              <span className={styles.legendLabel}>{st.label}:</span>
              <span className={styles.legendAmount}>{st.amount}</span>
              <span>({st.percentage}%)</span>
            </div>
          ))}
        </div>
        {createInfoComp({ currenttotal, max })}
      </div>
      <div className={styles.statusWrapper}>
        {statusWithPercentages.map((st, i) => (
          <div
            key={i + Math.random()}
            className={classNames(
              styles.statusOption,
              i === 0
                ? styles.firstStatusOption
                : i === statusWithPercentages.length - 1
                ? styles.lastStatusOption
                : null
            )}
            style={{
              width: `${st.widthPercentage}%`,
              backgroundColor: st.color
            }}
          />
        ))}
        {showMarker && (
          <div
            className={styles.markerWrapper}
            style={{
              left: markerPosition
            }}>
            <Tooltip
              content={markerTooltipText || markerPosition}
              className={styles.markerTooltip}
              contentClassName={markerTooltipClassName}>
              <div
                className={classNames(
                  styles.marker,
                  isDarkTheme && styles.markerDark
                )}
              />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

const DefaultInfoComp = ({ currenttotal, max }) => (
  <span>
    <span className={styles.infoCurrent}>{currenttotal}</span>
    <span className={styles.infoTotal}>/{max} votes</span>
  </span>
);

DefaultInfoComp.propTypes = {
  currenttotal: PropTypes.number,
  max: PropTypes.number
};

StatusBar.propTypes = {
  status: PropTypes.array.isRequired,
  markerPosition: PropTypes.string,
  markerTooltipText: PropTypes.string,
  markerTooltipClassName: PropTypes.string,
  renderStatusInfoComponent: PropTypes.element,
  max: PropTypes.number,
  showMarker: PropTypes.bool,
  className: PropTypes.string,
  decimalPlaces: PropTypes.number
};

StatusBar.defaultProps = {
  markerPosition: "0%",
  max: 0,
  showMarker: true,
  decimalPlaces: 1
};

export default StatusBar;
