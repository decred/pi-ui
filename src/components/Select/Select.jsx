import React, { useState, useRef, useCallback } from "react";
import styles from "./styles.css";
import { useClickOutside, useHandleKeyboardHook } from "./hooks";
import PropTypes from "prop-types";

const blankValue = { value: "", label: "" };

const Select = ({ onChange, ...props }) => {
  const initialOptions = props.options || [];
  const optionsWithIndexProp = initialOptions.map((x, idx) => {
    x._idx = idx;
    return x;
  });

  const optionContainerRef = useRef(null);
  const dropdownButton = useRef(null);

  const [currentOptionSelected, setCurrentOptionSelected] = useState(
    props.defaultValue &&
      optionsWithIndexProp.find((x) => x.value === props.defaultValue)
      ? optionsWithIndexProp.find((x) => x.value === props.defaultValue)
      : blankValue
  );

  const [legendLabel] = useState(props.legendLabel || "");
  const [selectOpen, setSelectOpen] = useState(false);
  const [options] = useState(optionsWithIndexProp);
  const [width] = useState(props.width || "");
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

  const style = {
    width: width || "100%",
    display: props.inline ? "inline-block" : "block"
  };
  const fixedHeightClassName = props.fixedHeight ? styles.fixedHeight : "";
  const cornerClassName = props.hasSharpCorners ? "" : styles.roundedCorners;
  const selectOpenClosedClass = selectOpen
    ? styles.selectOpen
    : styles.selectClosed;
  const valueSelected =
    currentOptionSelected.value === "" ? "" : styles.valueSelected;
  const coreCssClassNames = [
    styles.mySelectDefault,
    selectOpenClosedClass,
    valueSelected,
    fixedHeightClassName,
    cornerClassName
  ];

  const cancelButton = (
    <div className={styles.cancelContainer} onClick={cancelSelection}>
      <div className={styles.cancelContent}>
        <svg
          aria-hidden="true"
          focusable="false"
          height="20"
          viewBox="0 0 20 20"
          width="20">
          <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
        </svg>
      </div>
    </div>
  );
  const cancelSection = props.nonCancelable ? "" : cancelButton;

  return (
    <div className={coreCssClassNames.filter((x) => x).join(" ")} style={style}>
      <div className={styles.fieldset}>
        <div className={styles.legend}>{legendLabel}</div>
        <div
          className={styles.mainSectionWrapper}
          onClick={openSelect}
          ref={dropdownButton}>
          <div className={styles.selectedDisplay}>
            {props.renderOptionLabel && currentOptionSelected !== blankValue
              ? props.renderOptionLabel(currentOptionSelected)
              : currentOptionSelected.label}
          </div>
          {cancelSection}
          <div className={styles.downArrowContainer}>
            <div className={styles.downArrowContent}>
              <svg
                aria-hidden="true"
                focusable="false"
                height="20"
                viewBox="0 0 20 20"
                width="20">
                <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.mySelectDefaultOptions} ref={optionContainerRef}>
          {options.map((opt) => (
            <div
              onClick={optionSelected}
              key={opt._idx}
              index={opt._idx}
              className={
                opt._idx === focusedOptionIndex && styles.focused_option
              }>
              {props.renderOptionLabel && opt !== blankValue
                ? props.renderOptionLabel(opt)
                : opt.label}
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
  width: PropTypes.number,
  inline: PropTypes.bool,
  fixedHeight: PropTypes.bool,
  hasSharpCorners: PropTypes.bool,
  nonCancelable: PropTypes.bool,
  renderOptionLabel: PropTypes.bool
};

export default Select;
