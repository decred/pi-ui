import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";
import { mapToArray } from "./helpers";

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
  enableAllMonths
}) => {
  const value = values[padIndex];
  const ymArr = years;
  const months = lang
    ? Array.isArray(lang)
      ? lang
      : Array.isArray(lang.months)
      ? lang.months
      : null
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

  if (month === 1 || (atMinYear && month === ymArr[0].min.month))
    prevMonthCss = "disable";
  if (month === 12 || (atMaxYear && month === ymArr[yearMaxIdx].max.month))
    nextMonthCss = "disable";

  const isAllOptionSelected = value && yearActive && value.month === "all";

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
      <ul>
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
        {isMonthsMode && enableAllMonths && (
          <li
            className={classNames(
              styles.rmpBtn,
              isAllOptionSelected && styles.select
            )}
            data-id={`${padIndex}:all`}
            onClick={onMonthClick}>
            All
          </li>
        )}
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
  enableAllMonths: PropTypes.bool,
  onPrevYearClick: PropTypes.func,
  onNextYearClick: PropTypes.func,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onDayClick: PropTypes.func,
  onMonthClick: PropTypes.func
};

DatePickerPad.defaultProps = {
  padIndex: 0,
  isMonthsMode: false,
  enableAllMonths: false
};

export default DatePickerPad;
