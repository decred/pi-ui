import PropTypes from "prop-types";
import React from "react";
import Icon from "../Icon/Icon.jsx";
import { classNames } from "../../utils";
import Spinner from "../Spinner/Spinner.jsx";
import styles from "./styles.module.css";
import {
  useTheme,
  getThemeProperty,
  DEFAULT_DARK_THEME_NAME,
} from "../../theme";

const ButtonIcon = ({
  type,
  className,
  disabled,
  onClick,
  loading,
  viewBox,
  iconColor,
  iconBackgroundColor,
  text,
  ...props
}) => {
  const { theme, themeName } = useTheme();
  const btnIconColor =
    iconColor || getThemeProperty(theme, "button-icon-color-1");
  const btnIconBgColor =
    iconBackgroundColor || getThemeProperty(theme, "button-icon-color-2");
  const disabledBtnIconColor = getThemeProperty(
    theme,
    "button-icon-color-1-disabled"
  );
  const disabledBtnIconBgColor = getThemeProperty(
    theme,
    "button-icon-color-2-disabled"
  );
  const isDarkTheme = themeName === DEFAULT_DARK_THEME_NAME;
  return (
    <button
      type="button"
      className={classNames(
        styles.buttonIcon,
        disabled && styles.disabled,
        loading && styles.loading,
        text && styles.text,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}>
      {loading ? (
        <Spinner invert={!isDarkTheme} width="1.4rem" height="1.4rem" />
      ) : (
        <>
          <Icon
            type={type}
            viewBox={viewBox}
            iconColor={disabled ? disabledBtnIconColor : btnIconColor}
            backgroundColor={disabled ? disabledBtnIconBgColor : btnIconBgColor}
          />
          {text && <span>{text}</span>}
        </>
      )}
    </button>
  );
};

ButtonIcon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  viewBox: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  text: PropTypes.string,
  style: PropTypes.object
};

export default ButtonIcon;
