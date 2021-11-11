import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";
import { mapToArray, convertObjectToUnixTimestamp } from "./helpers";

const isValidDate = (date) => date && date.day && date.month && date.year;

const DatePickerPad = ({
  padIndex,
  values,
  year,
  month,
  years,
  yearIdx,
  lang,
  isMonthsMode,
  onPrevYearClick,
  onNextYearClick,
  onPrevMonthClick,
  onNextMonthClick,
  onMonthClick,
  onDayClick,
}) => {
  const value = values[padIndex];
  const ymArr = years;
  const months = Array.isArray(lang)
    ? lang
    : Array.isArray(lang.months)
    ? lang.months
    : null;
  let prevCss = "";
  let prevMonthCss = "";
  let nextCss = "";
  let nextMonthCss = "";
  const yearMaxIdx = ymArr.length - 1;

  if (yearIdx === 0) prevCss = "disable";
  if (yearIdx === yearMaxIdx) nextCss = "disable";

  const yearActive = value && year === value.year;
  const atMinYear = year === ymArr[0].year;
  const atMaxYear = year === ymArr[yearMaxIdx].year;
  let otherValue = false;
  if (values.length > 1) {
    otherValue = values[1 - padIndex];
  }

  const labelTextKey = padIndex === 0 ? "from" : "to";
  let labelPreText;
  if (otherValue && months[labelTextKey]) {
    labelPreText = <b>{months[labelTextKey]}</b>;
  }

  if (atMinYear && month === ymArr[0].min.month) prevMonthCss = "disable";
  if (atMaxYear && month === ymArr[yearMaxIdx].max.month)
    nextMonthCss = "disable";

  return (
    <div className={styles.rmpPad} key={padIndex}>
      <div>
        <label>
          {labelPreText}
          {year}
        </label>
        <i
          className={classNames(styles.rmpBtn, styles.prev, styles[prevCss])}
          data-id={padIndex}
          onClick={onPrevYearClick}>
          {"<"}
        </i>
        <i
          className={classNames(styles.rmpBtn, styles.next, styles[nextCss])}
          data-id={padIndex}
          onClick={onNextYearClick}>
          {">"}
        </i>
      </div>
      {!isMonthsMode && (
        <div>
          <label>{months ? months[month - 1] : month}</label>
          <i
            className={classNames(
              styles.rmpBtn,
              styles.prevMnth,
              styles[prevMonthCss]
            )}
            data-id={padIndex}
            onClick={prevMonthCss !== "disable" ? onPrevMonthClick : undefined}>
            {"<"}
          </i>
          <i
            className={classNames(
              styles.rmpBtn,
              styles.nextMnth,
              styles[nextMonthCss]
            )}
            data-id={padIndex}
            onClick={nextMonthCss !== "disable" ? onNextMonthClick : undefined}>
            {">"}
          </i>
        </div>
      )}
      <ul data-testid="days-list">
        {isMonthsMode &&
          mapToArray(12, (i) => {
            let css = "";
            const m = i + 1;
            if (yearActive && value && m === value.month) {
              css = "active";
            }
            if (
              values.length > 1 &&
              padIndex === 0 &&
              value &&
              (year > value.year || (year === value.year && m > value.month))
            ) {
              css = "select";
            }
            if (
              values.length > 1 &&
              padIndex === 1 &&
              value &&
              (year < value.year || (year === value.year && m < value.month))
            ) {
              css = "select";
            }
            if (atMinYear && m < ymArr[0].min.month) {
              css = "disable";
            }
            if (atMaxYear && m > ymArr[yearMaxIdx].max.month) {
              css = "disable";
            }
            if (otherValue) {
              const y = otherValue.year;
              const m = otherValue.month || 0;
              const vy = year;
              const vm = i + 1;
              if (
                y === vy &&
                m &&
                ((padIndex === 0 && vm > m) || (padIndex === 1 && vm < m))
              ) {
                css = "disable";
              } else if (
                (y > vy && padIndex === 1) ||
                (y < vy && padIndex === 0)
              ) {
                css = "disable";
              }
            }
            const clickHandler = css !== "disable" ? onMonthClick : undefined;
            return (
              <li
                key={i}
                className={classNames(styles.rmpBtn, styles[css])}
                data-id={`${padIndex}:${m}`}
                onClick={clickHandler}>
                {months ? months[i] : m}
              </li>
            );
          })}
        {!isMonthsMode &&
          mapToArray(new Date(year, month, 0).getDate(), (i) => {
            let css = "";
            const d = i + 1;
            if (
              yearActive &&
              value &&
              month === value.month &&
              d === value.day
            ) {
              css = "active";
            }
            // In range mode if both values selected highlight the range
            // items in the first pad (left side).
            if (
              values.length > 1 &&
              padIndex === 0 &&
              isValidDate(value) &&
              isValidDate(otherValue) &&
              ((year === value.year &&
                month === value.month &&
                d > value.day) ||
                (((year === value.year && month > value.month) ||
                  year > value.year) &&
                  convertObjectToUnixTimestamp({ day: d, month, year }) <=
                    convertObjectToUnixTimestamp({
                      day: otherValue.day,
                      month: otherValue.month,
                      year: otherValue.year,
                    })))
            ) {
              css = "select";
            }
            // In range mode if both values selected highlight the range
            // items in the second pad (right side).
            if (
              values.length > 1 &&
              padIndex === 1 &&
              isValidDate(value) &&
              isValidDate(otherValue) &&
              ((year === value.year &&
                month === value.month &&
                d < value.day) ||
                (((year === value.year && month < value.month) ||
                  year < value.year) &&
                  convertObjectToUnixTimestamp({ day: d, month, year }) >=
                    convertObjectToUnixTimestamp({
                      day: otherValue.day,
                      month: otherValue.month,
                      year: otherValue.year,
                    })))
            ) {
              css = "select";
            }
            if (
              atMinYear &&
              month === ymArr[0].min.month &&
              d < ymArr[0].min.day
            ) {
              css = "disable";
            }
            if (
              atMaxYear &&
              month === ymArr[yearMaxIdx].max.month &&
              d > ymArr[yearMaxIdx].max.day
            ) {
              css = "disable";
            }
            // In range mode if other value is selected disable items
            // which exceed it.
            if (isValidDate(otherValue)) {
              const currentTimestamp = convertObjectToUnixTimestamp({
                day: d,
                month,
                year,
              });
              const otherValueTimestamp = convertObjectToUnixTimestamp({
                day: otherValue.day,
                month: otherValue.month,
                year: otherValue.year,
              });
              switch (padIndex) {
                case 0:
                  if (currentTimestamp > otherValueTimestamp) {
                    css = "disable";
                  }
                  break;
                case 1:
                  if (currentTimestamp < otherValueTimestamp) {
                    css = "disable";
                  }
                  break;
                default: break;
              }
            }
            const clickHandler = css !== "disable" ? onDayClick : undefined;
            return (
              <li
                key={i}
                className={classNames(styles.rmpBtn, styles[css])}
                data-id={`${padIndex}:${month}:${d}`}
                onClick={clickHandler}>
                {d}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

DatePickerPad.propTypes = {
  padIndex: PropTypes.number.isRequired,
  values: PropTypes.array.isRequired,
  lang: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  years: PropTypes.array.isRequired,
  yearIdx: PropTypes.number.isRequired,
  isMonthsMode: PropTypes.bool,
  onPrevYearClick: PropTypes.func,
  onNextYearClick: PropTypes.func,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onDayClick: PropTypes.func,
  onMonthClick: PropTypes.func,
};

DatePickerPad.defaultProps = {
  padIndex: 0,
  isMonthsMode: false,
  enableAllMonths: false,
  lang: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

export default DatePickerPad;
