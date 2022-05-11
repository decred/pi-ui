import React, { useCallback, useLayoutEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./DatepickerPad.module.css";
import { classNames } from "../../utils";
import range from "lodash/range";
import chunk from "lodash/chunk";
import isUndefined from "lodash/isUndefined";

const noop = () => {};

const TAB_KEY = 9,
  ENTER_KEY = 13,
  ESC_KEY = 27,
  SPACE_KEY = 32,
  ARROW_LEFT_KEY = 37,
  ARROW_UP_KEY = 38,
  ARROW_RIGHT_KEY = 39,
  ARROW_DOWN_KEY = 40;

const validKeys = [
  ARROW_DOWN_KEY,
  ARROW_UP_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  SPACE_KEY,
  ESC_KEY,
  TAB_KEY,
  ENTER_KEY,
];

function getNextCoords(key, currentCoords) {
  let nextCoords = currentCoords;
  const [row, col] = currentCoords;
  switch (key) {
    case ARROW_DOWN_KEY:
      nextCoords = [row + 1, col];
      break;
    case ARROW_UP_KEY:
      nextCoords = [row - 1, col];
      break;
    case ARROW_RIGHT_KEY:
      nextCoords = [row, col + 1];
      break;
    case ARROW_LEFT_KEY:
      nextCoords = [row, col - 1];
      break;
    default:
      break;
  }
  return nextCoords;
}

function Element({ value, disabled, selected, onClick, tabIndex, isLong }) {
  return (
    <input
      tabIndex={tabIndex}
      readOnly
      value={value}
      onChange={noop}
      onClick={disabled ? noop : onClick}
      className={classNames(
        styles.element,
        isLong && styles.longElement,
        disabled && styles.disabled,
        selected && styles.selected
      )}
    />
  );
}

function DatePickerPad({
  lang,
  tabIndex,
  onClose,
  value,
  onChange,
  isMonthsMode,
  minTimestamp = Date.now(),
  maxTimestamp = 8640000000000000,
}) {
  const wrapperRef = useRef();
  // Min and Max date ranges
  const minDate = new Date(minTimestamp);
  const min = {
    day: minDate.getDate(),
    month: minDate.getMonth() + 1,
    year: minDate.getFullYear(),
  };
  const maxDate = new Date(maxTimestamp);
  const max = {
    day: maxDate.getDate(),
    month: maxDate.getMonth() + 1,
    year: maxDate.getFullYear(),
  };

  // Get current date
  const now = new Date();
  const today = {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };

  const [currentDate, setCurrentDate] = useState(today || value);
  const [selectedDate, setSelectedDate] = useState();
  // const [hoverId, setHoverId] = useState(undefined);
  const [selectedCoords, setSelectedCoords] = useState();
  // Number of days from current month and year
  const daysLength = new Date(currentDate.year, currentDate.month, 0).getDate();
  // Available Days Array
  const padDaysByRow = chunk(range(1, daysLength + 1), 5);
  // Number of months from current year
  const monthsLength = new Date(currentDate.year, 0, 0).getMonth() + 1;
  const padMonthsByRow = chunk(range(1, monthsLength + 1), 5);

  const currentMonthLabel = lang
    ? lang[currentDate.month - 1]
    : currentDate.month;

  // Disable input controllers
  const disablePreviousYear = currentDate.year === min.year;
  const disableNextYear = max.year === currentDate.year;
  const disablePreviousMonth =
    currentDate.month === min.month && disablePreviousYear;
  const disableNextMonth = currentDate.month === max.month && disableNextYear;

  // Change Handlers
  const handleChangeYear = (accValue) => () => {
    let month = currentDate.month;
    const year = currentDate.year + accValue;
    if (year === max.year && month > max.month) {
      month = max.month;
    } else if (year === min.year && month < min.month) {
      month = min.month;
    }
    const newDate = { day: currentDate.day, month, year };
    setCurrentDate(newDate);
  };
  const handleChangeMonth = (accValue) => () => {
    let targetMonth = currentDate.month + accValue;
    let targetYear = currentDate.year;
    // Get last month if current month is january
    if (targetMonth < 1) {
      targetMonth = 12;
      targetYear = targetYear - 1;
    } else if (targetMonth > 12) {
      // Get first month if current month is december
      targetMonth = 1;
      targetYear = targetYear + 1;
    }
    const newDate = { ...currentDate, month: targetMonth, year: targetYear };
    setCurrentDate(newDate);
  };
  const handleSelectMonth = (e) => {
    const month = e.target.value;
    const selectedMonth =
      typeof month === "string" ? lang.indexOf(month) + 1 : month;
    const newDate = { ...currentDate, month: selectedMonth };
    setSelectedDate(newDate);
    onChange && onChange(newDate);
  };
  const handleChangeDay = (e) => {
    const selectedDay = +e.target.value;
    const newDate = { ...currentDate, day: selectedDay };
    setSelectedDate(newDate);
    onChange && onChange(newDate);
  };

  const handleKey = useCallback(
    (e) => {
      // Validate key commands. Only valid keys are able to execute commands.
      if (!validKeys.includes(e.keyCode)) return;
      // tagPadElement receives the coordinates and focus the indicated element.
      // If coordinates correspond to an invalid element, they are replaced by
      // the last valid element for each coordinate. Returns the last valid
      // coordinates.
      function tagPadElement([selectedRow, selectedColumn]) {
        const row = selectedRow < 0 ? 0 : selectedRow;
        const column = selectedColumn < 0 ? 0 : selectedColumn;
        const targetRow = wrapperRef.current.children[row]
          ? row
          : wrapperRef.current.childElementCount - 1;
        const targetColumn = wrapperRef.current.children[targetRow].children[
          column
        ]
          ? column
          : wrapperRef.current.children[targetRow].childElementCount - 1;
        wrapperRef.current.children[targetRow].children[targetColumn].focus();
        return [targetRow, targetColumn];
      }

      if (e.keyCode === ESC_KEY || e.keyCode === TAB_KEY) {
        // ESC or TAB to dismiss
        onClose && onClose();
        return;
      }

      // Prevent default browser navigation conflicts
      e.preventDefault();
      let nextCoords;
      if (isUndefined(selectedCoords)) {
        // Undefined coords means no value has been selected on the pad.
        // If so, move to the first element on the first row.
        nextCoords = [0, 0];
      } else if (e.keyCode === SPACE_KEY) {
        // SPACE key press simulates a click
        document.activeElement.click();
        return;
      } else if (e.keyCode === ENTER_KEY) {
        // ENTER key press simulates a click + dismiss
        document.activeElement.click();
        onClose && onClose();
        return;
      } else {
        // Arrow keys pressed
        nextCoords = getNextCoords(e.keyCode, selectedCoords);
      }
      const validCoords = tagPadElement(nextCoords);
      setSelectedCoords(validCoords);
    },
    [selectedCoords, onClose]
  );

  useLayoutEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return (
    <div className={styles.container} ref={wrapperRef}>
      <div className={styles.row}>
        <Element
          tabIndex={tabIndex}
          disabled={disablePreviousYear}
          value="<"
          onClick={handleChangeYear(-1)}
        />
        <label data-testid="datepicker-pad-year-label" className={styles.label}>
          {currentDate.year}
        </label>
        <Element
          tabIndex={tabIndex}
          onClick={handleChangeYear(1)}
          disabled={disableNextYear}
          value=">"
        />
      </div>
      {!isMonthsMode && (
        <div className={styles.row}>
          <Element
            tabIndex={tabIndex}
            onClick={handleChangeMonth(-1)}
            value="<"
            disabled={disablePreviousMonth}
          />
          <label
            className={styles.label}
            data-testid="datepicker-pad-month-label">
            {currentMonthLabel}
          </label>
          <Element
            tabIndex={tabIndex}
            onClick={handleChangeMonth(1)}
            disabled={disableNextMonth}
            value=">"
          />
        </div>
      )}
      {/* Render pad. 
      If months mode, render pad with months, else, render days */}
      {!isMonthsMode
        ? padDaysByRow.map((row, rowKey) => {
            return (
              <div className={styles.padRow} key={rowKey}>
                {row.map((day, i) => {
                  const isDaySelected =
                    day === selectedDate?.day &&
                    currentDate.month === selectedDate?.month &&
                    currentDate.year === selectedDate?.year;
                  const isDayDisabled =
                    (day < min.day &&
                      disablePreviousMonth &&
                      disablePreviousYear) ||
                    (day > max.day && disableNextMonth && disableNextYear);
                  return (
                    <Element
                      tabIndex={tabIndex}
                      value={day}
                      key={i}
                      onClick={handleChangeDay}
                      disabled={isDayDisabled}
                      selected={isDaySelected}
                    />
                  );
                })}
              </div>
            );
          })
        : padMonthsByRow.map((row, rowKey) => {
            return (
              <div className={styles.padRow} key={rowKey}>
                {row.map((month, i) => {
                  const isMonthSelected =
                    month === selectedDate?.month &&
                    currentDate.year === selectedDate?.year;
                  const isDisabled =
                    (month < min.month && disablePreviousYear) ||
                    (month < max.month && disableNextYear);
                  return (
                    <Element
                      key={i}
                      tabIndex={tabIndex}
                      value={lang ? lang[month - 1] : month}
                      onClick={handleSelectMonth}
                      disabled={isDisabled}
                      selected={isMonthSelected}
                    />
                  );
                })}
              </div>
            );
          })}
    </div>
  );
}

DatePickerPad.propTypes = {
  lang: PropTypes.array,
  tabIndex: PropTypes.number,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  isMonthsMode: PropTypes.bool,
  minTimestamp: PropTypes.number,
  maxTimestamp: PropTypes.number,
  currentTimestamp: PropTypes.number,
  value: PropTypes.shape({
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }),
};

DatePickerPad.defaultProps = {
  isMonthsMode: false,
  lang: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

export default DatePickerPad;
