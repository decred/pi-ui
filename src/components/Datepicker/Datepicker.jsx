import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useLayoutEffect
} from "react";
import PropTypes from "prop-types";
import Tappable from "react-tapper";
import { classNames } from "../../utils";
import "./styles.css";
import {
  getYearArray,
  validValues,
  mapToArray,
  getYearsByNum,
  getDID
} from "./helpers";

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
  onShow,
  onYearChange
}) => {
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
  const [closeableState, setClosableState] = useState(show); // special, must not be changed with setState
  const [yearIndexesState] = useState(yearIndexes);
  const [pads, setPads] = useState([]);
  const [popupClass, setPopupClass] = useState("");
  const isRange = valuesState.length > 1;

  useEffect(() => {
    renderPad();
  }, [valuesState]);

  useEffect(() => {
    if (show && !showedState) {
      setClosableState(true);
      setShowedState(true);
      onShow && onShow();
    }
  }, [show]);

  useLayoutEffect(() => {
    document.addEventListener("keydown", _keyDown);
    return () => {
      document.removeEventListener("keydown", _keyDown);
    };
  }, []);

  const renderPad = () => {
    if (isRange > 1) {
      setPads([optionPad(0), optionPad(1)]);
      setPopupClass("range");
    } else {
      setPads([optionPad(0)]);
    }
  };

  const optionPad = (padIndex) => {
    const values = valuesState;
    const value = values[padIndex];
    const labelYears = labelYearsState;
    const labelYear = (labelYears[padIndex] =
      labelYears[padIndex] || value.year);
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
            className={classNames("rmp-tab", "rmp-btn", "prev", prevCss)}
            data-id={padIndex}
            onClick={handlePrevYearClick}>
            {"<"}
          </i>
          <i
            className={classNames("rmp-tab", "rmp-btn", "next", nextCss)}
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
                className={classNames("rmp-btn", css)}
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

  const handleOverlayTouchTap = (e) => {
    if (closeableState) {
      _onDismiss();
      onClickAway && onClickAway(e);
    }
  };

  const _onDismiss = () => {
    setShowedState(false);
    onDismiss && onDismiss(getValue());
  };

  const handleClickMonth = useCallback((e) => {
    const refid = getDID(e).split(":");
    const idx = parseInt(refid[0], 10);
    const month = parseInt(refid[1], 10);
    const year = labelYearsState[idx];
    const values = valuesState;
    values[idx] = { year, month };
    setValuesState(values);
    renderPad();
    onChange(year, month, idx);
  }, []);

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
    renderPad();
    onYearChange && onYearChange(theYear);
  };

  const _keyDown = useCallback((e) => {
    if (e.key === "Escape") {
      _onDismiss();
      e.stopPropagation();
    } else if (e.key === "Enter") {
      _onDismiss();
      e.stopPropagation();
    }
  }, []);

  return (
    <div className={["month-picker", className].join(" ")}>
      {children}
      <div
        className={classNames(
          "rmp-container",
          "rmp-table",
          className,
          showedState && "show"
        )}>
        <Tappable className="rmp-overlay" onTap={handleOverlayTouchTap} />
        <div className="rmp-cell">
          <div
            className={classNames(
              "rmp-popup",
              popupClass,
              theme,
              showedState && "show"
            )}>
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
  onShow: PropTypes.func,
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
