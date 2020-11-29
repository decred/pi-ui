import React from "react";
import PropTypes from "prop-types";
import { blankValue } from "../helpers";
import { useCreatableSelect } from "./hooks";
import { classNames } from "../../../utils";
import styles from "./styles.css";
import { animated, useTransition } from "react-spring";
import Icon from "../../Icon/Icon.jsx";

const CreatableSelect = ({
  disabled,
  clearable,
  options,
  defaultValue,
  label,
  separator,
  onChange,
  getOptionLabel,
  getOptionValue,
  optionRenderer,
  filterOptions,
  className,
  autoFocus,

  typeLabel,
  error,
  isValidNewOption,
  newOptionCreator,
  promptTextCreator,

  ...props
}) => {
  const {
    _options,
    optionContainerRef,
    dropdownRef,
    menuOpened,
    selectedOption,
    focusedOptionIndex,
    openMenu,
    showError,
    setFocusedOptionIndex,
    getValueKey,
    getLabelKey,
    selectOption,
    cancelSelection,

    newOption,
    addingNewOption,
    promptTextCreatorCallback,
    onCreatableChange,
    newOptionCreatorCallback
  } = useCreatableSelect(
    disabled,
    autoFocus,
    onChange,
    options,
    defaultValue,
    getOptionLabel,
    getOptionValue,
    filterOptions,

    typeLabel,
    isValidNewOption,
    newOptionCreator,
    promptTextCreator
  );

  const parentClassNames = classNames(
    styles.select,
    getValueKey(selectedOption) && styles.valueSelected,
    menuOpened ? styles.menuOpened : styles.menuClosed,
    separator && styles.hasSeparator,
    clearable && styles.clearable,
    disabled && styles.disabled,
    className
  );

  const transitions = useTransition(menuOpened, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    duration: 100
  });

  return (
    <div className={parentClassNames} {...props}>
      <div className={classNames(styles.fieldset, showError && styles.error)}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.controls} onClick={openMenu} ref={dropdownRef}>
          <input
            disabled={disabled}
            className={styles.input}
            value={
              newOption ||
              (menuOpened && !newOption ? "" : getLabelKey(selectedOption))
            }
            onChange={onCreatableChange}
          />
          {clearable && (
            <div className={styles.clear} onClick={cancelSelection} />
          )}
          {error && showError && (
            <Icon
              type="alert"
              backgroundColor="#ed6d47"
              iconColor="#feb8a5"
              className={classNames(styles.errorIcon, styles.errorIconActive)}
            />
          )}
          {separator && <span className={styles.separator} />}
          <div className={styles.arrowContainer}>
            <div className={styles.arrow} />
          </div>
        </div>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                className={styles.menu}
                key={key}
                ref={optionContainerRef}
                style={props}>
                {addingNewOption ? (
                  <div onClick={newOptionCreatorCallback}>
                    {promptTextCreatorCallback()}
                  </div>
                ) : (
                  _options.map((_option, index) => (
                    <div
                      onClick={selectOption}
                      onMouseEnter={() => setFocusedOptionIndex(index)}
                      key={index}
                      index={index}
                      className={classNames(
                        index === focusedOptionIndex && styles.focusedOption,
                        getValueKey(selectedOption) === getValueKey(_option) &&
                          styles.selected
                      )}>
                      {_option !== blankValue &&
                        (optionRenderer
                          ? optionRenderer(_option)
                          : getLabelKey(_option))}
                    </div>
                  ))
                )}
              </animated.div>
            )
        )}
      </div>
      {error && showError && (
        <p className={classNames(styles.errorMsg, styles.errorMsgActive)}>
          {error}
        </p>
      )}
    </div>
  );
};

CreatableSelect.propTypes = {
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  options: PropTypes.array,
  defaultValue: PropTypes.object,
  label: PropTypes.string,
  separator: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  optionRenderer: PropTypes.func,
  filterOptions: PropTypes.func,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,

  typeLabel: PropTypes.string,
  error: PropTypes.string,
  isValidNewOption: PropTypes.func,
  newOptionCreator: PropTypes.func,
  promptTextCreator: PropTypes.func
};

CreatableSelect.defaultProps = {
  disabled: false,
  clearable: false,
  options: [],
  defaultValue: blankValue,
  label: "",
  separator: false,
  getOptionLabel: null,
  getOptionValue: null,
  optionRenderer: null,
  filterOptions: null,
  className: "",
  autoFocus: false,

  typeLabel: "",
  error: "",
  isValidNewOption: null,
  newOptionCreator: null,
  promptTextCreator: null
};

export default CreatableSelect;
