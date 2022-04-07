import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../../utils";
import SliderHandle from "./SliderHandle.jsx";
import useSlider from "./hooks";
import styles from "./styles.module.css";

const Slider = ({
  double,
  disabled,
  axis,
  min,
  max,
  step,
  handles,
  className,
  rangeClassName,
  ...props
}) => {
  const { container, handleTrackMouseDown, valueStyle, handleHooks } =
    useSlider(double, disabled, axis, min, max, step, handles);

  const [leftHandleHook, rightHandleHook] = handleHooks;

  return (
    <div
      ref={container}
      className={classNames(
        styles[axis],
        styles.track,
        disabled && styles.disabled,
        className
      )}
      onTouchStart={handleTrackMouseDown}
      onMouseDown={handleTrackMouseDown}
      data-testid="slider-body"
      {...props}>
      {double && (
        <SliderHandle
          ref={rightHandleHook.handle}
          axis={axis}
          position={rightHandleHook.position}
          onTouchStart={rightHandleHook.handleMouseDown}
          onMouseDown={rightHandleHook.handleMouseDown}
          className={handles[1].className}
          dataTestId="slider-handle-1"
        />
      )}
      <div
        className={classNames(styles[axis], styles.active, rangeClassName)}
        style={valueStyle}
        data-testid="slider-bar"
      />
      <SliderHandle
        ref={leftHandleHook.handle}
        axis={axis}
        position={leftHandleHook.position}
        onTouchStart={leftHandleHook.handleMouseDown}
        onMouseDown={leftHandleHook.handleMouseDown}
        className={handles[0].className}
        dataTestId="slider-handle-0"
      />
    </div>
  );
};

Slider.propTypes = {
  double: PropTypes.bool,
  disabled: PropTypes.bool,
  axis: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number,
  handles: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      onChange: PropTypes.func,
      onDragStart: PropTypes.func,
      onDragEnd: PropTypes.func,
      className: PropTypes.string,
    })
  ),
  className: PropTypes.string,
  rangeClassName: PropTypes.string,
};

Slider.defaultProps = {
  double: false,
  disabled: false,
  axis: "x",
  min: 0,
  max: 100,
  step: 1,
  handles: [{ value: 0 }, { value: 40 }],
  className: "",
};

export default Slider;
