import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const StatusBar = ({ status, markerPosition, max }) => {
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
        <span>
          <span>{currentTotal}</span>
          <span className={styles.infoTotal}>/{max} votes</span>
        </span>
      </div>
      <div className={styles.statusWrapper}>
        {statusWithPercentages.map((st) => (
          <div
            style={{
              height: "8px",
              width: `${st.percentage}%`,
              backgroundColor: st.color
            }}
          />
        ))}
        <div
          className={styles.marker}
          style={{
            left: markerPosition
          }}
        />
      </div>
    </div>
  );
};

StatusBar.propTypes = {
  status: PropTypes.array.isRequired,
  markerPosition: PropTypes.string,
  max: PropTypes.number
};

StatusBar.defaultProps = {
  markerPosition: "0%",
  max: 0
};

export default StatusBar;
