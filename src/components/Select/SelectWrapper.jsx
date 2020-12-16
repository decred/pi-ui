import React from "react";
import { classNames } from "../../utils";
import styles from "./styles.css";
import { SelectOptions } from "./helpers";
import { animated } from "react-spring";

const SelectWrapper = (
  Loading,
  Footer,
  Input,
  Controls,
  condition,
  {
    containerRef,
    menuOpened,
    openMenu,
    transitions,

    focusedOptionIndex,
    setFocusedOptionIndex,
    _options
  },
  {
    disabled,
    clearable,
    options,
    label,
    separator,
    getOptionValue,

    getOptionLabel,
    optionRenderer,
    selectOption,

    className,
    searchable,
    value,
    inputValue,
    ...props
  }
) => {
  const parentClassNames = classNames(
    styles.select,
    (Array.isArray(value) ? value.length : getOptionValue(value)) &&
      styles.valueSelected,
    searchable && inputValue && styles.search,
    menuOpened ? styles.menuOpened : styles.menuClosed,
    separator && styles.hasSeparator,
    clearable && styles.clearable,
    disabled && styles.disabled,
    className
  );

  return (
    <div className={parentClassNames} {...props}>
      <div className={styles.fieldset} ref={containerRef}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.controls} onClick={openMenu}>
          {Input}
          {Controls}
        </div>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div className={styles.menu} key={key} style={props}>
                {condition ? (
                  <SelectOptions
                    options={_options} //
                    value={value}
                    selectOption={selectOption} //
                    focusedOptionIndex={focusedOptionIndex} //
                    setFocusedOptionIndex={setFocusedOptionIndex} //
                    optionRenderer={optionRenderer} //
                    getOptionLabel={getOptionLabel} //
                    getOptionValue={getOptionValue}
                  />
                ) : (
                  Loading
                )}
              </animated.div>
            )
        )}
      </div>
      {Footer}
    </div>
  );
};

export default SelectWrapper;
