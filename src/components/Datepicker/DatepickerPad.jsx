import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";
import { mapToArray } from "./helpers";

const DatePickerPad = ({
  padIndex,
  values,
  labelYear,
  labelMonth,
  years,
  yearIdx,
  lang,
  isMonthsMode,
  onPrevYearClick,
  onNextYearClick,
  onPrevMonthClick,
  onNextMonthClick,
  onMonthClick,
  onDayClick
}) => {
  const value = values[padIndex];
  const ymArr = years;
  const months = Array.isArray(lang)
    ? lang
    : Array.isArray(lang.months)
    ? lang.months
    : [];
  let prevCss = "";
  let prevMonthCss = "";
  let nextCss = "";
  let nextMonthCss = "";
  const yearMaxIdx = ymArr.length - 1;

  if (yearIdx === 0) prevCss = "disable";
  if (yearIdx === yearMaxIdx) nextCss = "disable";

  const yearActive = labelYear === value.year;
  const atMinYear = labelYear === ymArr[0].year;
  const atMaxYear = labelYear === ymArr[yearMaxIdx].year;
  let otherValue = false;
  if (values.length > 1) {
    otherValue = values[1 - padIndex];
  }

  const labelTextKey = padIndex === 0 ? "from" : "to";
  let labelPreText;
  if (otherValue && lang[labelTextKey]) {
    labelPreText = <b>{lang[labelTextKey]}</b>;
  }

  if (labelMonth === 1 || (atMinYear && labelMonth === ymArr[0].min))
    prevMonthCss = "disable";
  if (labelMonth === 12 || (atMaxYear && labelMonth === ymArr[yearMaxIdx].max))
    nextMonthCss = "disable";

  return (
    <div className={styles.rmpPad} key={padIndex}>
      <div>
        <label>
          {labelPreText}
          {labelYear}
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
          <label>{labelMonth}</label>
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
              styles.nextMonth,
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
            if (yearActive && m === value.month) {
              css = "active";
            }
            if (
              values.length > 1 &&
              padIndex === 0 &&
              (labelYear > value.year ||
                (labelYear === value.year && m > value.month))
            ) {
              css = "select";
            }
            if (
              values.length > 1 &&
              padIndex === 1 &&
              (labelYear < value.year ||
                (labelYear === value.year && m < value.month))
            ) {
              css = "select";
            }
            if (atMinYear && m < ymArr[0].min) {
              css = "disable";
            }
            if (atMaxYear && m > ymArr[yearMaxIdx].max) {
              css = "disable";
            }
            if (otherValue) {
              const y = otherValue.year;
              const m = otherValue.month || 0;
              const vy = labelYear;
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
                {months.length > i ? months[i] : i}
              </li>
            );
          })}
        {!isMonthsMode &&
          mapToArray(new Date(labelYear, labelMonth, 0).getDate(), (i) => {
            let css = "";
            const d = i + 1;
            if (yearActive && labelMonth === value.month && d === value.day) {
              css = "active";
            }
            const clickHandler = css !== "disable" ? onDayClick : undefined;
            return (
              <li
                key={i}
                className={classNames(styles.rmpBtn, styles[css])}
                data-id={`${padIndex}:${labelMonth}:${d}`}
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
  lang: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  labelYear: PropTypes.number.isRequired,
  labelMonth: PropTypes.number.isRequired,
  years: PropTypes.array.isRequired,
  yearIdx: PropTypes.number.isRequired,
  isMonthsMode: PropTypes.bool,
  onPrevYearClick: PropTypes.func,
  onNextYearClick: PropTypes.func,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onDayClick: PropTypes.func,
  onMonthClick: PropTypes.func
};

DatePickerPad.defaultProps = {
  padIndex: 0,
  isMonthsMode: false
};

export default DatePickerPad;
