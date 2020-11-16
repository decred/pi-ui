import React, { useEffect, useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import {
  getClientPosition,
  addEventListeners,
  DIMENSIONS_MAP,
  POSITIONS_MAP,
  POSITIONS_MAP_CAPITALIZED
} from "./helpers";
import styles from "./styles.css";

export function useSliderHandle(
  container,
  double,
  disabled,
  axis,
  min,
  max,
  step,
  value,
  onChange,
  onDragStart,
  onDragEnd,
  barrier
) {
  const handle = useRef(null);
  const start = useRef({});
  const offset = useRef({});

  useEffect(() => {
    if (value > max) onChange(max);
    if (value < min) onChange(min);
  }, [value, max, min, onChange]);

  useEffect(() => {
    if (double && !barrier(value)) {
      onChange(value - step);
    }
  }, [double, value, barrier, step, onChange]);

  const position = useMemo(() => {
    let newValue = ((value - min) / (max - min)) * 100;

    if (newValue > 100) newValue = 100;
    if (newValue < 0) newValue = 0;

    return axis === "x"
      ? { top: 0, left: newValue }
      : { top: newValue, left: 0 };
  }, [value, min, max, axis]);

  const change = useCallback(
    (position) => {
      if (!onChange) return;

      const dimension = container.current.getBoundingClientRect()[
        DIMENSIONS_MAP[axis]
      ];
      let ds = 0;

      if (position < 0) position = 0;
      if (position > dimension) position = dimension;

      ds = (position / dimension) * (max - min);

      const newPosition = (ds !== 0 ? parseInt(ds / step, 10) * step : 0) + min;

      if (!double || barrier(newPosition)) {
        onChange(newPosition);
      }
    },
    [container, onChange, axis, min, max, step, double, barrier]
  );

  const getPos = useCallback(
    (e) => {
      const clientPos = getClientPosition(e);
      const position =
        clientPos[axis] + start.current[axis] - offset.current[axis];
      return position;
    },
    [axis]
  );

  const handleDrag = useCallback(
    (e) => {
      if (disabled) return;

      e.preventDefault();
      change(getPos(e));
    },
    [disabled, change, getPos]
  );

  const handleDragEnd = useCallback(
    (e) => {
      if (disabled) return;

      e.preventDefault();
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("touchmove", handleDrag, {
        passive: false
      });

      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchend", handleDragEnd);
      document.removeEventListener("touchcancel", handleDragEnd);

      if (onDragEnd) {
        onDragEnd(e);
      }
    },
    [disabled, onDragEnd, handleDrag]
  );

  const handleMouseDown = useCallback(
    (e) => {
      if (disabled) return;

      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      const dom = handle.current;
      const clientPos = getClientPosition(e);

      start.current[axis] = dom[`offset${POSITIONS_MAP_CAPITALIZED[axis]}`];
      offset.current[axis] = clientPos[axis];

      addEventListeners(handleDrag, handleDragEnd);

      if (onDragStart) {
        onDragStart(e);
      }
    },
    [axis, disabled, onDragStart, handleDrag, handleDragEnd]
  );

  return {
    position,
    handleMouseDown,
    handle,
    handleDrag,
    handleDragEnd,
    change
  };
}

const SliderHandle = React.forwardRef(
  ({ axis, position, onTouchStart, onMouseDown }, ref) => {
    const style = { top: "50%", left: "50%" };
    style[POSITIONS_MAP[axis]] = position[POSITIONS_MAP[axis]] + "%";

    return (
      <div
        {...{ ref, style, onTouchStart, onMouseDown }}
        className={styles.handle}
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}>
        <div className={styles.thumb} />
      </div>
    );
  }
);

SliderHandle.propTypes = {
  axis: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired,
  style: PropTypes.object,
  onTouchStart: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired
};

export default SliderHandle;
