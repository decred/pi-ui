import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Tappable from "react-tapper";
import { classNames } from "../../utils";
import styles from "./stylesv2.module.css";
import DatePickerPad from "./DatepickerPadv2.jsx";
import { useTheme } from "../../theme";

function DefaultLabel({ value }) {
  return value ? (
    <div>{`${value.month}/${value.day}/${value.year}`}</div>
  ) : (
    "Pick a Date"
  );
}

const DatePicker = ({
  value,
  lang,
  className,
  activeClassName,
  children,
  onDismiss,
  onChange,
  isMonthsMode,
  minTimestamp,
  maxTimestamp,
  tabIndex,
}) => {
  const { themeName } = useTheme();
  const [showedState, setShowedState] = useState(false);
  const [valueState, setValueState] = useState(value);

  function handleClose() {
    onDismiss && onDismiss();
    setShowedState(false);
  }

  const defaultToggle = useCallback(() => {
    setShowedState(!showedState);
  }, [showedState, setShowedState]);

  function handleChange(value) {
    onChange(value);
    setValueState(value);
  }

  return (
    <div
      className={classNames(
        styles.monthPicker,
        className,
        showedState && activeClassName
      )}>
      <input
        type="text"
        tabIndex={tabIndex}
        onFocus={defaultToggle}
        className={styles.hidden}
      />
      <div onClick={defaultToggle}>
        {children || <DefaultLabel value={value} />}
      </div>
      {showedState && (
        <div
          className={classNames(
            styles.rmpContainer,
            styles.rmpTable,
            showedState && styles.show
          )}>
          <Tappable className={styles.rmpOverlay} onTap={handleClose} />
          <div className={styles.rmpCell}>
            <div
              className={classNames(
                styles.rmpPopup,
                isMonthsMode && styles.monthsMode,
                themeName && styles[themeName],
                showedState && styles.show
              )}>
              <DatePickerPad
                onClose={handleClose}
                onChange={handleChange}
                lang={lang}
                value={valueState}
                tabIndex={tabIndex}
                isMonthsMode={isMonthsMode}
                minTimestamp={minTimestamp}
                maxTimestamp={maxTimestamp}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DatePicker.propTypes = {
  value: PropTypes.shape({
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }),
  lang: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  children: PropTypes.node,
  onDismiss: PropTypes.func,
  onChange: function (props, propName) {
    var fn = props[propName];
    if (
      !fn ||
      !fn.prototype ||
      typeof fn.prototype.constructor !== "function" ||
      fn.prototype.constructor.length < 2 ||
      fn.prototype.constructor.length > 3
    ) {
      return new Error(
        `${propName} must be a function with 2 (if isMonthsMode is on) or 3 args. Args are: year, month and day.`
      );
    }
  },
  isMonthsMode: PropTypes.bool,
  minTimestamp: PropTypes.number,
  maxTimestamp: PropTypes.number,
  tabIndex: PropTypes.number,
};

DatePicker.defaultProps = {
  isMonthsMode: false,
  tabIndex: 0,
};

export default DatePicker;
