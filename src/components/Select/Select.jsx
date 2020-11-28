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
  cancelable,

  creatable,
  isValidNewOption,
  newOptionCreator,
  promptTextCreator,

  getOptionLabel,
  getOptionValue,

  optionRenderer,
  valueRenderer
}) => {
  const optionContainerRef = useRef(null);
  const dropdownButton = useRef(null);

  const [selectOpen, setSelectOpen] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

  const [newOption, setNewOption] = useState("");
  const [addingNewOption, setAddingNewOption] = useState(false);

  const newOptions = useRef([]);

  const getValueKey = getOptionValue || (({ value }) => value);
  const getLabelKey = getOptionLabel || (({ label }) => label);

  function getOptions() {
    if (!creatable) return options;
    const _options = [...options, ...newOptions.current].filter(
      (item, pos, self) =>
        self.findIndex((_item) => getValueKey(_item) === getValueKey(item)) ===
        pos
    );

    console.log(_options);

    _options.unshift({
      label: "Type to add a new option",
      value: ""
    });
    return _options;
  }

  const [currentOptionSelected, setCurrentOptionSelected] = useState(
    (defaultValue &&
      getOptions().find((x) => getValueKey(x) === defaultValue)) ||
      blankValue
  );

  function setOption(option, knownIndex) {
    const index =
      knownIndex ||
      getOptions().findIndex(
        (opt) =>
          getValueKey(opt) === getValueKey(option) &&
          getLabelKey(opt) === getLabelKey(option)
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
      const maxOptionIndex = getOptions().length - 1;
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
        const optionByIndex = getOptions()[optionIndex];
        if (onChange) {
          onChange(e, getValueKey(optionByIndex), optionByIndex);
        }
        setOption(optionByIndex, optionIndex);
      }
    }
  });

  function findOptionWrapper(el) {
    return el.getAttribute("index") ? el : findOptionWrapper(el.parentNode);
  }

  function optionSelected(e) {
    if (creatable) {
      const optionWrapper = findOptionWrapper(e.target);
      const optionIndex = parseInt(optionWrapper.getAttribute("index"), 10);
      const optionByIndex = getOptions()[optionIndex];
      if (onChange) {
        console.log("optionByIndex", optionByIndex);

        setNewOption(getLabelKey(optionByIndex));
        onChange(e, getValueKey(optionByIndex), optionByIndex);
      }
      setOption(optionByIndex, optionIndex);
    } else {
      const optionWrapper = findOptionWrapper(e.target);
      const optionIndex = parseInt(optionWrapper.getAttribute("index"), 10);
      const optionByIndex = getOptions()[optionIndex];
      if (onChange) {
        onChange(e, getValueKey(optionByIndex), optionByIndex);
      }
      setOption(optionByIndex, optionIndex);
    }
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

  const isValidNewOptionCallback = useCallback(
    () => isValidNewOption(newOption),
    [isValidNewOption, newOption]
  );

  const promptTextCreatorCallback = useCallback(
    () => promptTextCreator(newOption),
    [promptTextCreator, newOption]
  );

  function onCreatableChange(e) {
    console.log(e.target);

    const _newOption = e.target.value;

    console.log(e.target.value);

    setNewOption(_newOption);
    setAddingNewOption(
      !getOptions().find((option) => getLabelKey(option) === _newOption)
    );

    console.log(newOption, addingNewOption);
  }

  const newOptionCreatorCallback = () => {
    newOptions.current.push({ label: newOption, value: newOption });
    onCreatableChange({ target: { value: newOption } });
    setSelectOpen(false);
    newOptionCreator(newOption);
  };

  const coreCssClassNames = classNames(
    styles.mySelectDefault,
    getValueKey(currentOptionSelected) && styles.valueSelected,
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
          {creatable ? (
            <input
              className={styles.textinput}
              value={newOption}
              onChange={onCreatableChange}
            />
          ) : (
            <div className={styles.selectedDipromptTextCreatorsplay}>
              {currentOptionSelected !== blankValue &&
                (valueRenderer
                  ? valueRenderer(currentOptionSelected)
                  : getLabelKey(currentOptionSelected))}
            </div>
          )}
          {!cancelable ? null : (
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
          {!addingNewOption &&
            getOptions().map((opt, index) => (
              <div
                onClick={optionSelected}
                key={index}
                index={index}
                className={
                  index === focusedOptionIndex && styles.focusedOption
                }>
                {opt !== blankValue &&
                  (optionRenderer ? optionRenderer(opt) : getLabelKey(opt))}
              </div>
            ))}
          {addingNewOption && isValidNewOptionCallback(newOption) && (
            <div onClick={newOptionCreatorCallback}>
              {promptTextCreatorCallback()}
            </div>
          )}
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
  cancelable: PropTypes.bool,
  creatable: PropTypes.bool,
  isValidNewOption: PropTypes.func,
  newOptionCreator: PropTypes.func,
  promptTextCreator: PropTypes.func,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  optionRenderer: PropTypes.func,
  valueRenderer: PropTypes.func
};

Select.defaultProps = {
  options: [],
  defaultValue: blankValue,
  legendLabel: "",
  cancelable: false,
  creatable: false,
  isValidNewOption: undefined,
  newOptionCreator: undefined,
  promptTextCreator: undefined,
  getOptionLabel: undefined,
  getOptionValue: undefined,
  optionRenderer: undefined,
  valueRenderer: undefined
};

export default Select;
