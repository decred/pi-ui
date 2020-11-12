import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import {
  getClientPosition,
  addEventListeners,
  DIMENSIONS_MAP,
  POSITIONS_MAP
} from "./helpers";
import { classNames } from "../../utils";
import styles from "./styles.css";
import SliderHandle, { useSliderHandle } from "./SliderHandle";

function useSlider(double, disabled, axis, min, max, step, handles) {
  const container = useRef(null);

  if (double) {
    handles[0].barrier = useCallback((value) => value <= handles[1].value, [
      handles
    ]);
    handles[1].barrier = useCallback((value) => value >= handles[0].value, [
      handles
    ]);
  }

  const handleHooks = handles.map((handle) =>
    useSliderHandle(
      container,
      double,
      disabled,
      axis,
      min,
      max,
      step,
      handle.value,
      handle.onChange,
      handle.onDragStart,
      handle.onDragEnd,
      handle.barrier
    )
  );

  const handleTrackMouseDown = useCallback(
    (e) => {
      if (disabled) return;

      e.preventDefault();
      const clientPos = getClientPosition(e);
      const rect = container.current.getBoundingClientRect();

      let handleIndex = 0;

      if (double) {
        const handlePosition = handleHooks.map(
          (handleHook) =>
            handleHook.handle.current.getBoundingClientRect()[axis] + 9
        );

        if (
          (clientPos[axis] > handlePosition[0] &&
            clientPos[axis] < handlePosition[1] &&
            clientPos[axis] - handlePosition[0] >=
              handlePosition[1] - clientPos[axis]) ||
          clientPos[axis] >= handlePosition[1]
        )
          handleIndex = 1;
      }

      addEventListeners(
        handleHooks[handleIndex].handleDrag,
        handleHooks[handleIndex].handleDragEnd
      );

      handleHooks[handleIndex].change(
        clientPos[axis] - rect[POSITIONS_MAP[axis]]
      );

      if (handleHooks[handleIndex].onDragStart) {
        handleHooks[handleIndex].onDragStart(e);
      }
    },
    [axis, disabled, double, handleHooks]
  );

  const sliderHandles = handleHooks.map((handleHook, index) => {
    const onPositionMemo = handleHook.positionMemo;
    return (
      <SliderHandle
        key={index}
        ref={handleHook.handle}
        axis={axis}
        positionMemo={onPositionMemo}
        onTouchStart={handleHook.handleMouseDown}
        onMouseDown={handleHook.handleMouseDown}
      />
    );
  });

  const valueStyle = {};

  if (double) {
    valueStyle[POSITIONS_MAP[axis]] =
      handleHooks[0].positionMemo[POSITIONS_MAP[axis]] + "%";

    valueStyle[DIMENSIONS_MAP[axis]] =
      handleHooks[1].positionMemo[POSITIONS_MAP[axis]] -
      handleHooks[0].positionMemo[POSITIONS_MAP[axis]] +
      "%";
  } else {
    valueStyle[DIMENSIONS_MAP[axis]] =
      handleHooks[0].positionMemo[POSITIONS_MAP[axis]] + "%";
  }

  return {
    container,
    handleTrackMouseDown,
    valueStyle,
    sliderHandles
  };
}

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
    sliderHandles
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
      {double && sliderHandles[1]}
      <div
        className={classNames(styles[axis], styles.active)}
        style={valueStyle}
      />
      {sliderHandles[0]}
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
