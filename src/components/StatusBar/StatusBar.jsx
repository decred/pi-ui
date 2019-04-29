import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const StatusBar = ({
  status,
  markerPosition,
  max,
  showMarker,
  renderStatusInfo
}) => {
  const currentTotal = status.reduce((acc, cur) => acc + cur.amount, 0);
  const statusWithPercentages = status.map((item) => ({
    ...item,
    percentage: (item.amount / currentTotal) * 100
  }));
  return (
    <div>
      <div className={styles.statusInfo}>
        <div className={styles.legend}>
          {statusWithPercentages.map((st, i) => (
            <div className={styles.legendLine}>
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
        {!renderStatusInfo && (
          <span>
            <span className={styles.infoCurrent}>{currentTotal}</span>
            <span className={styles.infoTotal}>/{max} votes</span>
          </span>
        )}
      </div>
      <div className={styles.statusWrapper}>
        {statusWithPercentages.map((st, i) => (
          <div
            className={classNames(
              styles.statusOption,
              i === 0
                ? styles.firstStatusOption
                : i === statusWithPercentages.length - 1
                ? styles.lastStatusOption
                : null
            )}
            style={{
              width: `${st.percentage}%`,
              backgroundColor: st.color
            }}
          />
        ))}
        {showMarker && (
          <div
            className={styles.marker}
            title={markerPosition}
            style={{
              left: markerPosition
            }}
          />
        )}
      </div>
    </div>
  );
};

StatusBar.propTypes = {
  status: PropTypes.array.isRequired,
  markerPosition: PropTypes.string,
  renderStatusInfo: PropTypes.node,
  max: PropTypes.number,
  showMarker: PropTypes.bool
};

StatusBar.defaultProps = {
  markerPosition: "0%",
  max: 0,
  showMarker: true
};

export default StatusBar;
