/**
 * Date-Picker
 *
 * Properties:
 * @years:
 *  - array: [2013, 2015, 2016]
 *  - number: 5 (last 4 years and this year)
 *  - object: {min: 2013, max: 2016} (from 2013 to 2016); {min: 2013} (from 2013 to this year); {max: 2015} (5 years to 2015)
 * @value: default value for picking a single month, e.g. {year: 2015: month: 11}
 * @range: default value for picking a span of months, e.g. {from: {year: 2014: month: 7}, to: {year: 2015: month: 11}}
 * @lang: language texts
 *  - array: array of months' texts, e.g. ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
 *  - object: including array of months' texts and other display texts
 *      e.g. {from: "From:", to: "To:", months: [...]}
 * @theme: theme setting of month-picker; 2 options (light/dark); default theme is light
 */

import React, { useState, useLayoutEffect, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Tappable from "react-tapper";
import "./styles.css";

const __MIN_VALID_YEAR = 1;

const mapToArray = (num, callback) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(callback(i));
  }
  return arr;
};

const getYearMon = (year, min, max) => {
  const ym =
    typeof year === "object" && year.year
      ? { year: year.year, month: year.month }
      : { year };
  ym.min = min || 1;
  ym.max = max || 12;
  return ym;
};

const getYearsByNum = (n, minYear) => {
  let maxYear = new Date().getFullYear();
  // n is number of years
  if (n && n > 0 && n < 1000) {
    minYear = minYear || maxYear - n + 1;
  }
  // n is invalid value
  else {
    // n is max year
    if (n && n >= 1000) maxYear = n;

    if (minYear) {
      n = maxYear - minYear + 1;
    } else {
      n = 5;
      minYear = maxYear - n + 1;
    }
  }
  return mapToArray(n, (i) => {
    return getYearMon(minYear + i);
  });
};

const getYearArray = (years) => {
  if (Array.isArray(years)) return years.map((y, i) => getYearMon(y));
  if (typeof years === "object") {
    let n = 0;
    let min = 0;
    const ymin = getYearMon(years.min);
    const ymax = getYearMon(years.max);
    if (typeof ymin.year === "number" && ymin.year > __MIN_VALID_YEAR)
      min = ymin.year;
    if (typeof ymax.year === "number" && ymax.year >= min) n = ymax.year;
    const arr = getYearsByNum(n, min);
    const last = arr.length - 1;
    if (last >= 0) {
      arr[0].min = ymin.month || arr[0].month;
      arr[last].max = ymax.month || arr[last].month;
    }
    return arr;
  } else if (typeof years === "number" && years > 0)
    return getYearsByNum(years);
  else return getYearsByNum(5);
};

const DatePicker = ({
  range,
  years,
  show,
  value,
  lang,
  className,
  children,
  theme,
  onClickAway,
  onDismiss,
  onChange,
  onYearChange
}) => {
  const validate = (d, years, idx, yearIndexes) => {
    const now = new Date();
    const thisYear = now.getFullYear();
    let ym;
    if (
      d &&
      typeof d.year === "number" &&
      d.year > __MIN_VALID_YEAR &&
      typeof d.month === "number" &&
      d.month >= 1 &&
      d.month <= 12
    ) {
      ym = d;
    }

    let foundThisYear;
    for (let i = 0; i < years.length; i++) {
      if (ym && years[i].year === ym.year) {
        yearIndexes[idx] = i;
        return ym;
      } else if (years[i].year === thisYear) {
        foundThisYear = i;
      }
    }

    if (typeof foundThisYear === "number") {
      yearIndexes[idx] = foundThisYear;
      return { year: thisYear };
    }

    const last = (yearIndexes[idx] = years.length - 1);
    return { year: years[last].year };
  };

  const validValues = (v, years, yearIndexes) => {
    if (!v) return [];
    if (v.from || v.to) {
      const from = validate(v.from, years, 0, yearIndexes);
      const to = validate(v.to, years, 1, yearIndexes);
      if (
        from.year > to.year ||
        (from.year === to.year && from.month > to.month)
      ) {
        from.year = to.year;
        from.month = to.month;
        if (from.month < 1) {
          from.year--;
          from.month += 12;
        }
      }
      return [from, to];
    }
    return [validate(v, years, 0, yearIndexes)];
  };

  const yearArr = useMemo(() => getYearArray(years), [getYearArray, years]);
  const yearIndexes = useMemo(() => [0], []);
  const values = useMemo(
    () => validValues(range || value, yearArr, yearIndexes),
    [range, value, yearArr, yearIndexes]
  );

  const [yearsState] = useState(yearArr);
  const [valuesState, setValuesState] = useState(values);
  const [labelYearsState, setLabelYearsState] = useState([false, false]);
  const [showedState, setShowedState] = useState(show);
  const [closeableState] = useState(show); // special, must not be changed with setState
  const [yearIndexesState] = useState(yearIndexes);

  useLayoutEffect(() => {
    document.addEventListener("keydown", _keyDown);
    return () => {
      document.removeEventListener("keydown", _keyDown);
    };
  }, []);

  const optionPad = (padIndex) => {
    const values = valuesState;
    const value = values[padIndex];
    const labelYears = labelYearsState;
    const labelYear = (labelYears[padIndex] =
      labelYears[padIndex] || value.year);
    console.log(yearsState);
    const ymArr = yearsState;
    const months = Array.isArray(lang)
      ? lang
      : Array.isArray(lang.months)
      ? lang.months
      : [];
    let prevCss = "";
    let nextCss = "";
    const yearMaxIdx = ymArr.length - 1;
    const yearIdx = yearIndexesState[padIndex]; // yearMaxIdx

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

    return (
      <div className="rmp-pad" key={padIndex}>
        <div>
          <label>
            {labelPreText}
            {labelYear}
          </label>
          <i
            className={["rmp-tab", "rmp-btn", "prev", prevCss].join(" ")}
            data-id={padIndex}
            onClick={handlePrevYearClick}>
            {"<"}
          </i>
          <i
            className={["rmp-tab", "rmp-btn", "next", nextCss].join(" ")}
            data-id={padIndex}
            onClick={handleNextYearClick}>
            {">"}
          </i>
        </div>
        <ul>
          {mapToArray(12, (i) => {
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
            const clickHandler =
              css !== "disable" ? handleClickMonth : undefined;
            return (
              <li
                key={i}
                className={["rmp-btn", css].join(" ")}
                data-id={padIndex + ":" + (i + 1)}
                onClick={clickHandler}>
                {months.length > i ? months[i] : i}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const getValue = () => {
    const values = valuesState;
    if (values.length >= 2) return { from: values[0], to: values[1] };
    else if (values.length === 1) return values[0];
    return {};
  };

  const [pads, setPads] = useState([]);
  const [popupClass, setPopupClass] = useState("");

  useEffect(() => {
    if (valuesState.length > 1) {
      setPads([optionPad(0), optionPad(1)]);
      setPopupClass("range");
    } else {
      setPads([optionPad(0)]);
    }
  }, [valuesState]);

  const _handleOverlayTouchTap = (e) => {
    if (closeableState) {
      _onDismiss();
      onClickAway && onClickAway(e);
    }
  };

  const _onDismiss = () => {
    // this.setState(Object.assign({ showed: false, loading: false }, s));
    setShowedState(false);
    onDismiss && onDismiss(getValue());
  };

  const handleClickMonth = (e) => {
    if (showedState) {
      const refid = getDID(e).split(":");
      const idx = parseInt(refid[0], 10);
      const month = parseInt(refid[1], 10);
      const year = labelYearsState[idx];
      const values = valuesState;
      values[idx] = { year, month };
      setValuesState(values);
      onChange(year, month, idx);
    }
  };

  const handlePrevYearClick = (e) => {
    const idx = parseInt(getDID(e), 10);
    if (yearIndexesState[idx] > 0) {
      setYear(idx, -1);
    }
  };

  const handleNextYearClick = (e) => {
    const idx = parseInt(getDID(e), 10);
    if (yearIndexesState[idx] < yearsState.length - 1) {
      setYear(idx, 1);
    }
  };

  const setYear = (idx, step) => {
    const yearIndex = (yearIndexesState[idx] += step);
    const labelYears = labelYearsState;
    const theYear = yearsState[yearIndex].year;
    labelYears[idx] = theYear;
    setLabelYearsState(labelYears);
    onYearChange && onYearChange(theYear);
  };

  const getDID = (e) => {
    const el = e.target;
    return el.dataset ? el.dataset.id : el.getAttribute("data-id");
  };

  const _keyDown = (e) => {
    if (!showedState) return;

    if (e.key === "Escape") {
      _onDismiss();
      e.stopPropagation();
    } else if (e.key === "Enter") {
      _onDismiss();
      e.stopPropagation();
    } else if (valuesState.length === 1) {
      // todo: delete empty block
    }
  };

  return (
    <div className={["month-picker", className].join(" ")}>
      {children}
      <div
        className={[
          "rmp-container",
          "rmp-table",
          className,
          showedState ? "show" : ""
        ].join(" ")}>
        <Tappable className="rmp-overlay" onTap={_handleOverlayTouchTap} />
        <div className="rmp-cell">
          <div
            className={[
              "rmp-popup",
              popupClass,
              theme,
              showedState ? "show" : ""
            ].join(" ")}>
            {pads}
          </div>
        </div>
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  years: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  value: PropTypes.object,
  range: PropTypes.object,
  lang: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  onYearChange: PropTypes.func,
  onDismiss: PropTypes.func,
  onClickAway: PropTypes.func,
  theme: PropTypes.string,
  show: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node
};

DatePicker.defaultProps = {
  years: getYearsByNum(5),
  onChange(year, month, idx) {},
  theme: "light",
  show: false,
  lang: []
};

export default DatePicker;
