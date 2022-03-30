import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { classNames } from "../../utils";
import { useTheme, DEFAULT_DARK_THEME_NAME } from "../../theme";
import Tooltip from "../Tooltip/Tooltip.jsx";

const StatusBar = ({
  status,
  markerPosition,
  markerTooltipText,
  markerTooltipClassName,
  renderMarkerComponent,
  max,
  showMarker,
  renderStatusInfoComponent,
  className,
  decimalPlaces,
  layout,
  showPercent,
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
      widthPercentage,
    };
  });

  const { themeName } = useTheme();
  const isDarkTheme = themeName === DEFAULT_DARK_THEME_NAME;

  const createInfoComp = (props) =>
    renderStatusInfoComponent ? (
      React.cloneElement(renderStatusInfoComponent, props)
    ) : (
      <DefaultInfoComp {...props} />
    );

  return (
    <div
      className={classNames(
        styles.statusBar,
        className,
        layout === "balance" && styles.balance
      )}>
      <div className={styles.statusInfo}>
        <div className={styles.legend}>
          {statusWithPercentages.map((st, i) => (
            <div className={styles.legendLine} key={i + Math.random()}>
              <div
                style={{ backgroundColor: st.color }}
                className={styles.legendColor}
              />{" "}
              <span className={styles.legendLabel}>{st.label}:</span>
              {st.renderAmountComponent || (
                <span className={styles.legendAmount}>{st.amount}</span>
              )}
              {showPercent && <span>({st.percentage}%)</span>}
            </div>
          ))}
        </div>
        {createInfoComp({ currenttotal, max })}
      </div>
      <div
        className={classNames(
          styles.statusWrapper,
          isDarkTheme && styles.statusWrapperDark
        )}>
        {statusWithPercentages.map((st, i) => {
          return (
            <React.Fragment key={i + Math.random()}>
              {i === 1 &&
                showMarker &&
                (renderMarkerComponent || (
                  <div
                    className={styles.markerWrapper}
                    style={{
                      left: markerPosition,
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
                ))}
              {layout === "balance" ? (
                <div>
                  <StatusOption
                    percentage={st.widthPercentage}
                    color={st.color}
                    className={styles.statusOption}
                  />
                </div>
              ) : (
                <StatusOption
                  percentage={st.widthPercentage}
                  color={st.color}
                  className={styles.statusOption}
                />
              )}
            </React.Fragment>
          );
        })}
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
  max: PropTypes.number,
};

const StatusOption = ({ percentage, color, className }) => (
  <div
    className={className}
    style={{
      width: `${percentage}%`,
      backgroundColor: color,
    }}
  />
);

StatusOption.propTypes = {
  percentage: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

StatusBar.propTypes = {
  status: PropTypes.array.isRequired,
  markerPosition: PropTypes.string,
  markerTooltipText: PropTypes.node,
  markerTooltipClassName: PropTypes.string,
  renderMarkerComponent: PropTypes.element,
  renderStatusInfoComponent: PropTypes.element,
  max: PropTypes.number,
  showMarker: PropTypes.bool,
  className: PropTypes.string,
  decimalPlaces: PropTypes.number,
  layout: PropTypes.string,
  showPercent: PropTypes.bool,
};

StatusBar.defaultProps = {
  markerPosition: "0%",
  max: 0,
  showMarker: true,
  decimalPlaces: 1,
  layout: "default",
  showPercent: true,
};

export default StatusBar;
