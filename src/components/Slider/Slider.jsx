import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../../utils";
import SliderHandle from "./SliderHandle.jsx";
import useSlider from "./hooks";
import styles from "./styles.css";

const Slider = ({
  double,
  disabled,
  axis,
  min,
  max,
  step,
  handles,
  ...props
}) => {
  const {
    container,
    handleTrackMouseDown,
    valueStyle,
    handleHooks
  } = useSlider(double, disabled, axis, min, max, step, handles);

  return (
    <div
      {...props}
      ref={container}
      className={classNames(
        styles[axis],
        styles.track,
        disabled && styles.disabled
      )}
      onTouchStart={handleTrackMouseDown}
      onMouseDown={handleTrackMouseDown}>
      {double && (
        <SliderHandle
          ref={handleHooks[1].handle}
          axis={axis}
          position={handleHooks[1].position}
          onTouchStart={handleHooks[1].handleMouseDown}
          onMouseDown={handleHooks[1].handleMouseDown}
        />
      )}
      <div
        className={classNames(styles[axis], styles.active)}
        style={valueStyle}
      />
      <SliderHandle
        ref={handleHooks[0].handle}
        axis={axis}
        position={handleHooks[0].position}
        onTouchStart={handleHooks[0].handleMouseDown}
        onMouseDown={handleHooks[0].handleMouseDown}
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
      onDragEnd: PropTypes.func
    })
  )
};

Slider.defaultProps = {
  double: false,
  disabled: false,
  axis: "x",
  min: 0,
  max: 100,
  step: 1,
  handles: [{ value: 0 }, { value: 40 }]
};

export default Slider;
