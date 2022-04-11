import PropTypes from "prop-types";
import React from "react";
import Icon from "../Icon/Icon.jsx";
import { classNames } from "../../utils";
import Spinner from "../Spinner/Spinner.jsx";
import Tooltip from "../Tooltip/Tooltip.jsx";
import styles from "./styles.module.css";
import {
  useTheme,
  getThemeProperty,
  DEFAULT_DARK_THEME_NAME,
} from "../../theme";

const Wrapper = ({ tooltipText, tooltipPlacement, children }) =>
  tooltipText ? (
    <Tooltip content={tooltipText} placement={tooltipPlacement}>
      {children}
    </Tooltip>
  ) : (
    children
  );

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
  tooltipText,
  tooltipPlacement,
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
    <Wrapper tooltipText={tooltipText} tooltipPlacement={tooltipPlacement}>
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
              backgroundColor={
                disabled ? disabledBtnIconBgColor : btnIconBgColor
              }
            />
            {text && <span>{text}</span>}
          </>
        )}
      </button>
    </Wrapper>
  );
};

ButtonIcon.propTypes = {
  type: PropTypes.oneOf([
    "alert",
    "chart",
    "copyToClipboard",
    "search",
    "chain",
    "checkmark",
    "discuss",
    "down",
    "info",
    "right",
    "proposal",
    "questionmark",
    "left",
    "star",
    "timer",
    "transaction",
    "trash",
    "up",
    "user",
    "wallet",
    "like",
    "dislike",
    "link",
    "sign",
    "world",
    "blocked",
    "edit",
    "expand",
    "mail",
    "mailCheck",
    "github",
    "calendar",
    "horizontalLink",
    "clickArrow",
    "markdown",
    "compare",
    "arrow",
    "sendMax",
    "accounts",
    "qr",
    "plus",
    "cancel",
    "refresh",
    "searchBlock",
    "decredLogo",
    "privacy",
    "ln",
    "trezor",
    "create",
    "restore",
    "watchOnly",
    "bold",
    "italic",
    "bulletList",
    "code",
    "image",
    "numberedList",
    "quote",
    "taskList",
  ]).isRequired,
  className: PropTypes.string,
  viewBox: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  text: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipPlacement: PropTypes.oneOf(["top", "bottom", "right", "left"]),
  style: PropTypes.object,
};

export default ButtonIcon;
