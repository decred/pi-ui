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
import styles from "./styles.css";
import DatePickerPad from "./DatepickerPad.jsx";
import { getYearArray, validValues, getYearsByNum, getDID } from "./helpers";

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
  onYearChange,
  isMonthsMode
}) => {
  const yearArr = useMemo(() => getYearArray(years), [getYearArray, years]);
  const yearIndexes = useMemo(() => [], []);
  const values = useMemo(
    () => validValues(range || value, yearArr, yearIndexes),
    [range, value, yearArr, yearIndexes]
  );

  const [yearsState] = useState(yearArr);
  const [valuesState, setValuesState] = useState(values);
  const [labelYearsState, setLabelYearsState] = useState([false, false]);
  const [labelMonthsState, setLabelMonthsState] = useState([false, false]);
  const [showedState, setShowedState] = useState(show);
  const [yearIndexesState] = useState(yearIndexes);
  const [pads, setPads] = useState([]);
  const isRange = valuesState.length > 1;

  onDismiss = onDismiss || onChange;

  useEffect(() => {
    showedState && renderPad();
  }, [valuesState[0], valuesState[valuesState.length - 1], showedState]);

  useEffect(() => {
    if (show && !showedState) {
      setShowedState(true);
      onShow && onShow();
    } else if (!show && showedState) {
      setShowedState(false);
    }
  }, [show]);

  useLayoutEffect(() => {
    document.addEventListener("keydown", _keyDown);
    return () => {
      document.removeEventListener("keydown", _keyDown);
    };
  }, []);

  const padByIndex = (padIndex) => {
    const labelYears = labelYearsState;
    const labelMonths = labelMonthsState;
    const labelYear = (labelYears[padIndex] =
      labelYears[padIndex] || value.year);
    const labelMonth = (labelMonths[padIndex] =
      labelMonths[padIndex] || value.month);
    return (
      <DatePickerPad
        key={padIndex}
        padIndex={padIndex}
        values={valuesState}
        years={yearsState}
        year={labelYear}
        month={labelMonth}
        lang={lang}
        yearIdx={yearIndexesState[padIndex]}
        onMonthClick={handleClickMonth}
        isMonthsMode={isMonthsMode}
        onDayClick={handleClickDay}
        onPrevYearClick={handlePrevYearClick}
        onNextYearClick={handleNextYearClick}
        onPrevMonthClick={handlePrevMonthClick}
        onNextMonthClick={handleNextMonthClick}
      />
    );
  };

  const renderPad = () => {
    if (isRange > 1) {
      setPads([padByIndex(0), padByIndex(1)]);
    } else {
      setPads([padByIndex(0)]);
    }
  };

  const getValue = () => {
    const values = valuesState;
    if (values.length >= 2) return { from: values[0], to: values[1] };
    else if (values.length === 1) return values[0];
    return {};
  };

  const handleOverlayTouchTap = (e) => {
    if (showedState) {
      _onDismiss();
      onClickAway && onClickAway(e);
    }
  };

  const handleClickMonth = useCallback((e) => {
    const refid = getDID(e).split(":");
    const idx = parseInt(refid[0], 10);
    const month = parseInt(refid[1], 10);
    const year = labelYearsState[idx];
    const values = valuesState;
    values[idx] = { year, month };
    setValuesState(values);
    onChange(year, month, idx);
  }, []);

  const handleClickDay = useCallback((e) => {
    const refid = getDID(e).split(":");
    const idx = parseInt(refid[0], 10);
    const month = parseInt(refid[1], 10);
    const day = parseInt(refid[2], 10);
    const year = labelYearsState[idx];
    const values = valuesState;
    values[idx] = { year, month, day };
    setValuesState(values);
    onChange(year, month, day, idx);
  }, []);

  const handlePrevYearClick = useCallback((e) => {
    const idx = parseInt(getDID(e), 10);
    if (yearIndexesState[idx] > 0) {
      _setYear(idx, -1);
    }
  }, []);

  const handleNextYearClick = useCallback((e) => {
    const idx = parseInt(getDID(e), 10);
    if (yearIndexesState[idx] < yearsState.length - 1) {
      _setYear(idx, 1);
    }
  }, []);

  const handleNextMonthClick = (e) => {
    const idx = parseInt(getDID(e), 10);
    const labelMonth = labelMonthsState[idx];
    const nextMonth = labelMonth + 1;
    if (nextMonth <= 12) {
      labelMonthsState[idx] = nextMonth;
      setLabelMonthsState(labelMonthsState);
      renderPad();
    }
  };

  const handlePrevMonthClick = useCallback((e) => {
    const idx = parseInt(getDID(e), 10);
    const labelMonth = labelMonthsState[idx];
    const nextMonth = labelMonth - 1;
    if (nextMonth > 0) {
      labelMonthsState[idx] = nextMonth;
      setLabelMonthsState(labelMonthsState);
      renderPad();
    }
  }, []);

  const _setYear = (idx, step) => {
    const yearIndex = (yearIndexesState[idx] += step);
    const labelYears = labelYearsState;
    const theYear = yearsState[yearIndex].year;
    labelYears[idx] = theYear;
    setLabelYearsState(labelYears);
    const atMinYear = theYear === yearsState[0].year;
    const atMaxYear = theYear === yearsState[yearsState.length - 1].year;
    if (
      !isMonthsMode &&
      atMinYear &&
      labelMonthsState[idx] < yearsState[yearIndex].min
    ) {
      labelMonthsState[idx] = yearsState[yearIndex].min;
      setLabelMonthsState(labelMonthsState);
    } else if (
      !isMonthsMode &&
      atMaxYear &&
      labelMonthsState[idx] > yearsState[yearIndex].max
    ) {
      labelMonthsState[idx] = yearsState[yearIndex].max;
    }
    renderPad();
    onYearChange && onYearChange(theYear);
  };

  const _onDismiss = () => {
    setShowedState(false);
    onDismiss && onDismiss(getValue());
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
    <div className={classNames(styles.monthPicker, className)}>
      {children}
      <div
        className={classNames(
          styles.rmpContainer,
          styles.rmpTable,
          showedState && styles.show
        )}>
        <Tappable className={styles.rmpOverlay} onTap={handleOverlayTouchTap} />
        <div className={styles.rmpCell}>
          <div
            className={classNames(
              styles.rmpPopup,
              isMonthsMode && styles.monthsMode,
              isRange && styles.range,
              styles[theme],
              showedState && styles.show
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
  isMonthsMode: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node
};

DatePicker.defaultProps = {
  years: getYearsByNum(5),
  onChange(year, month, idx) {},
  theme: "light",
  show: false,
  lang: [],
  isMonthsMode: false
};

export default DatePicker;
