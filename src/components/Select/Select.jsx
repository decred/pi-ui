import React, { useState, useRef, useCallback } from "react";
import styles from "./styles.css";
import { useClickOutside, useHandleKeyboardHook } from "./hooks";
import PropTypes from "prop-types";
import { classNames } from "../../utils";
import cleanIcon from "./clean.svg";

const blankValue = { value: "", label: "" };

const Select = ({
  onChange,
  defaultValue,
  legendLabel,
  options,
  nonCancelable
}) => {
  const optionContainerRef = useRef(null);
  const dropdownButton = useRef(null);

  const [currentOptionSelected, setCurrentOptionSelected] = useState(
    (defaultValue && options.find((x) => x.value === defaultValue)) ||
      blankValue
  );

  const [selectOpen, setSelectOpen] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

  function setOption(option, knownIndex) {
    const index =
      knownIndex ||
      options.findIndex(
        (opt) => opt.value === option.value && opt.label === option.label
      );
    setCurrentOptionSelected(option);
    setFocusedOptionIndex(index);
    setFocusedOptionIndex(0);
    setSelectOpen(false);
  }

  useClickOutside(() => {
    setFocusedOptionIndex(0);
    setSelectOpen(false);
  })(optionContainerRef.current, dropdownButton.current);

  useHandleKeyboardHook((e) => {
    if (selectOpen) {
      const maxOptionIndex = options.length - 1;
      if (e.key === "ArrowDown") {
        const newIndex =
          focusedOptionIndex === maxOptionIndex ? 0 : focusedOptionIndex + 1;
        optionContainerRef.current
          .querySelector(`div[index="${newIndex}"]`)
          .scrollIntoViewIfNeeded(false);
        setFocusedOptionIndex(newIndex);
      }
      if (e.key === "ArrowUp") {
        const newIndex =
          focusedOptionIndex === 0 ? maxOptionIndex : focusedOptionIndex - 1;
        optionContainerRef.current
          .querySelector(`div[index="${newIndex}"]`)
          .scrollIntoViewIfNeeded(true);
        setFocusedOptionIndex(newIndex);
      }
      if (e.key === "Enter") {
        const optionIndex = focusedOptionIndex;
        const optionByIndex = options[optionIndex];
        if (onChange) {
          onChange(e, optionByIndex.value, optionByIndex);
        }
        setOption(optionByIndex, optionIndex);
      }
    }
  });

  function findOptionWrapper(el) {
    return el.getAttribute("index") ? el : findOptionWrapper(el.parentNode);
  }

  function optionSelected(e) {
    const optionWrapper = findOptionWrapper(e.target);
    const optionIndex = parseInt(optionWrapper.getAttribute("index"), 10);
    const optionByIndex = options[optionIndex];
    if (onChange) {
      onChange(e, optionByIndex.value, optionByIndex);
    }
    setOption(optionByIndex, optionIndex);
  }

  const openSelect = useCallback(() => {
    setSelectOpen((selectOpen) => !selectOpen);
  }, []);

  function cancelSelection(e) {
    if (onChange) {
      onChange(e);
    }
    setCurrentOptionSelected(blankValue);
    setFocusedOptionIndex(0);
    setSelectOpen(false);
    e.stopPropagation();
  }

  const coreCssClassNames = classNames(
    styles.mySelectDefault,
    currentOptionSelected.value && styles.valueSelected,
    selectOpen ? styles.selectOpen : styles.selectClosed
  );

  return (
    <div className={coreCssClassNames}>
      <div className={styles.fieldset}>
        {legendLabel && (
          <label className={styles.textinputLabel}>{legendLabel}</label>
        )}
        <div
          className={styles.mainSectionWrapper}
          onClick={openSelect}
          ref={dropdownButton}>
          <div className={styles.selectedDisplay}>
            {currentOptionSelected !== blankValue &&
              currentOptionSelected.label}
          </div>
          {nonCancelable ? null : (
            <div className={styles.cancelContainer} onClick={cancelSelection}>
              <img src={cleanIcon} />
            </div>
          )}
          <span className={styles.separator} />
          <div className={styles.downArrowContainer}>
            <div className={styles.downArrowContent} />
          </div>
        </div>
        <div className={styles.mySelectDefaultOptions} ref={optionContainerRef}>
          {options.map((opt, index) => (
            <div
              onClick={optionSelected}
              key={index}
              index={index}
              className={index === focusedOptionIndex && styles.focusedOption}>
              {opt !== blankValue && opt.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  defaultValue: PropTypes.object,
  legendLabel: PropTypes.string,
  nonCancelable: PropTypes.bool
};

Select.defaultProps = {
  options: [],
  defaultValue: blankValue,
  legendLabel: "",
  nonCancelable: false
};

export default Select;
