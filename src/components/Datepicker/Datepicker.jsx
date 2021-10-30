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
import { useTheme } from "../../theme";
import {
  getYearArray,
  validValues,
  getYearsByNum,
  getDID,
  getInitialYears,
  hasDateValueChanged,
  getIndexByYear,
  duplicateToArray,
  makeLabelText
} from "./helpers";

const DatePicker = ({
  isRange,
  years,
  show,
  value,
  lang,
  className,
  children,
  onClickAway,
  onDismiss,
  onChange,
  onShow,
  onYearChange,
  isMonthsMode
}) => {
  const { themeName } = useTheme();
  const yearArr = useMemo(() => getYearArray(years), [years]);
  const yearIndexes = useMemo(() => [0, 0], []);
  const values = useMemo(() => validValues(value, yearArr, yearIndexes), [
    value,
    yearArr,
    yearIndexes
  ]);

  const isDefaultPicker = useMemo(() => !children, [children]);

  const [yearsState] = useState(yearArr);
  const [valuesState, setValuesState] = useState(values);
  const [labelYearsState, setLabelYearsState] = useState(
    getInitialYears(values, yearsState)
  );
  const [labelMonthsState, setLabelMonthsState] = useState([
    values[0] ? values[0].month : yearsState[0].min.month,
    values[1] ? values[1].month : yearsState[0].min.month
  ]);
  const [showedState, setShowedState] = useState(show);
  const [yearIndexesState, setYearIndexesState] = useState(yearIndexes);
  const [pads, setPads] = useState([]);

  onDismiss = onDismiss || onChange;

  const handleClickMonth = useCallback(
    (e) => {
      const refid = getDID(e).split(":");
      const idx = parseInt(refid[0], 10);
      const month = parseInt(refid[1], 10);
      const year = labelYearsState[idx];
      if (idx === 0) {
        setLabelYearsState(duplicateToArray(year));
        setYearIndexesState(duplicateToArray(yearIndexesState[0]));
      }
      const values = [...valuesState];
      values[idx] = { year, month };
      setValuesState(values);
      onChange(year, month, idx);
    },
    [
      labelYearsState,
      onChange,
      valuesState,
      setLabelYearsState,
      setValuesState,
      yearIndexesState,
      setYearIndexesState
    ]
  );

  const handleClickDay = useCallback(
    (e) => {
      const refid = getDID(e).split(":");
      const idx = parseInt(refid[0], 10);
      const month = parseInt(refid[1], 10);
      const day = parseInt(refid[2], 10);
      const year = labelYearsState[idx];
      const values = [...valuesState];
      values[idx] = { year, month, day };
      setValuesState(values);
      onChange(year, month, day, idx);
    },
    [onChange, setValuesState, labelYearsState, valuesState]
  );

  const _setYear = useCallback(
    (idx, step) => {
      const currentYearIndex = yearIndexesState[idx];
      const yearIndex = currentYearIndex + step;
      const newYearIndexesState = [...yearIndexesState];
      newYearIndexesState[idx] = yearIndex;
      setYearIndexesState(newYearIndexesState);
      const labelYears = labelYearsState;
      const theYear = yearsState[yearIndex].year;
      labelYears[idx] = theYear;
      setLabelYearsState(labelYears);
      const atMinYear = theYear === yearsState[0].year;
      const atMaxYear = theYear === yearsState[yearsState.length - 1].year;
      const currentLabelMonth = labelMonthsState[idx];
      if (
        !isMonthsMode &&
        atMinYear &&
        currentLabelMonth < yearsState[yearIndex].min.month
      ) {
        const newLabelMonthsState = [...labelMonthsState];
        newLabelMonthsState[idx] = yearsState[yearIndex].min.month;
        setLabelMonthsState(newLabelMonthsState);
      } else if (
        !isMonthsMode &&
        atMaxYear &&
        currentLabelMonth > yearsState[yearIndex].max.month
      ) {
        const newLabelMonthsState = [...labelMonthsState];
        newLabelMonthsState[idx] = yearsState[yearIndex].max.month;
        setLabelMonthsState(newLabelMonthsState);
      }
      onYearChange && onYearChange(theYear);
    },
    [
      onYearChange,
      isMonthsMode,
      labelYearsState,
      labelMonthsState,
      yearsState,
      yearIndexesState
    ]
  );

  const handlePrevYearClick = useCallback(
    (e) => {
      const idx = parseInt(getDID(e), 10);
      if (yearIndexesState[idx] > 0) {
        _setYear(idx, -1);
      }
    },
    [yearIndexesState, _setYear]
  );

  const handleNextYearClick = useCallback(
    (e) => {
      const idx = parseInt(getDID(e), 10);
      if (yearIndexesState[idx] < yearsState.length - 1) {
        _setYear(idx, 1);
      }
    },
    [yearIndexesState, _setYear, yearsState.length]
  );

  const handleNextMonthClick = useCallback(
    (e) => {
      const idx = parseInt(getDID(e), 10);
      const labelMonth = labelMonthsState[idx];
      let nextMonth = labelMonth + 1;
      const newLabelMonthsState = [...labelMonthsState];
      if (labelMonth < 12) {
        newLabelMonthsState[idx] = nextMonth;
        setLabelMonthsState(newLabelMonthsState);
      } else if (
        labelMonth === 12 &&
        yearIndexesState[idx] < yearsState.length - 1
      ) {
        nextMonth = 1;
        _setYear(idx, 1);
        newLabelMonthsState[idx] = nextMonth;
        setLabelMonthsState(newLabelMonthsState);
      }
    },
    [
      labelMonthsState,
      setLabelMonthsState,
      yearIndexesState,
      _setYear,
      yearsState.length
    ]
  );

  const handlePrevMonthClick = useCallback(
    (e) => {
      const idx = parseInt(getDID(e), 10);
      const labelMonth = labelMonthsState[idx];
      const newLabelMonthsState = [...labelMonthsState];
      let nextMonth = labelMonth - 1;
      if (labelMonth > 1) {
        newLabelMonthsState[idx] = nextMonth;
        setLabelMonthsState(newLabelMonthsState);
      } else if (labelMonth === 1 && yearIndexesState[idx] > 0) {
        nextMonth = 12;
        _setYear(idx, -1);
        newLabelMonthsState[idx] = nextMonth;
        setLabelMonthsState(newLabelMonthsState);
      }
    },
    [labelMonthsState, setLabelMonthsState, yearIndexesState, _setYear]
  );

  const padByIndex = useCallback(
    (padIndex) => {
      return (
        <DatePickerPad
          key={padIndex}
          padIndex={padIndex}
          values={valuesState}
          years={yearsState}
          year={labelYearsState[padIndex]}
          month={labelMonthsState[padIndex]}
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
    },
    [
      handleClickMonth,
      handleClickDay,
      handlePrevYearClick,
      handleNextYearClick,
      handlePrevMonthClick,
      handleNextMonthClick,
      isMonthsMode,
      lang,
      labelMonthsState,
      labelYearsState,
      valuesState,
      yearIndexesState,
      yearsState
    ]
  );

  const renderPad = useCallback(() => {
    if (isRange) {
      setPads([padByIndex(0), padByIndex(1)]);
    } else {
      setPads([padByIndex(0)]);
    }
  }, [isRange, padByIndex]);

  useEffect(() => {
    showedState && renderPad();
  }, [valuesState, showedState, renderPad, labelMonthsState, labelYearsState]);

  useEffect(() => {
    if (show && !showedState) {
      setShowedState(true);
      onShow && onShow();
    } else if (!show && showedState && !isDefaultPicker) {
      setShowedState(false);
    }
  }, [show, onShow, setShowedState, showedState, isDefaultPicker]);

  useEffect(
    function onExternalValueChanges() {
      if (hasDateValueChanged(values, valuesState)) {
        const newIndexes = values.map((val) =>
          getIndexByYear(val.year, yearArr)
        );
        const newLabels = values.map((y) => y.year);

        setLabelYearsState(newLabels);
        setYearIndexesState(newIndexes);
        setValuesState(values);
      }
    },
    [
      values,
      valuesState,
      setValuesState,
      setYearIndexesState,
      setLabelYearsState,
      yearArr
    ]
  );

  const getValue = useCallback(() => {
    const values = valuesState;
    if (values.length >= 2) return { from: values[0], to: values[1] };
    else if (values.length === 1) return values[0];
    return {};
  }, [valuesState]);

  const _onDismiss = useCallback(() => {
    setShowedState(false);
    onDismiss && onDismiss(getValue());
  }, [onDismiss, setShowedState, getValue]);

  const _keyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        _onDismiss();
        e.stopPropagation();
      } else if (e.key === "Enter") {
        _onDismiss();
        e.stopPropagation();
      }
    },
    [_onDismiss]
  );

  useLayoutEffect(() => {
    document.addEventListener("keydown", _keyDown);
    return () => {
      document.removeEventListener("keydown", _keyDown);
    };
  }, [_keyDown]);

  const handleOverlayTouchTap = (e) => {
    if (showedState) {
      _onDismiss();
      onClickAway && onClickAway(e);
    }
  };

  const defaultToggle = useCallback(() => {
    setShowedState(!showedState);
  }, [showedState, setShowedState]);

  return (
    <div className={classNames(styles.monthPicker, className)}>
      {children}
      {!children && (
        <span
          onClick={defaultToggle}
          className={styles.defaultDatepickerValueWrapper}>
          {makeLabelText(values)}
          <div
            className={
              showedState
                ? styles.defaultDatepickerArrowOpen
                : styles.defaultDatepickerArrow
            }
          />
        </span>
      )}
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
              themeName && styles[themeName],
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
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isRange: PropTypes.bool,
  lang: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  onYearChange: PropTypes.func,
  onShow: PropTypes.func,
  onDismiss: PropTypes.func,
  onClickAway: PropTypes.func,
  show: PropTypes.bool,
  isMonthsMode: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node
};

DatePicker.defaultProps = {
  years: getYearsByNum(5),
  onChange(year, month, idx) {},
  show: false,
  isMonthsMode: false,
  isRange: false
};

export default DatePicker;
