import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const StatusBar = ({
  status,
  markerPosition,
  max,
  showMarker,
  renderStatusInfoComponent
}) => {
  const currenttotal = status.reduce((acc, cur) => acc + cur.amount, 0);
  const statusWithPercentages = status.map((item) => ({
    ...item,
    percentage: (item.amount / currenttotal) * 100
  }));
  const createInfoComp = (props) =>
    renderStatusInfoComponent ? (
      React.cloneElement(renderStatusInfoComponent, props)
    ) : (
      <DefaultInfoComp {...props} />
    );
  return (
    <div>
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
  renderStatusInfoComponent: PropTypes.element,
  max: PropTypes.number,
  showMarker: PropTypes.bool
};

StatusBar.defaultProps = {
  markerPosition: "0%",
  max: 0,
  showMarker: true
};

export default StatusBar;
