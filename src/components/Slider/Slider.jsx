import React, { useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import {
  getClientPosition,
  addEventListeners,
  DIMENSIONS_MAP,
  POSITIONS_MAP,
  POSITIONS_MAP_CAPITALIZED
} from "./helpers";
import { classNames } from "../../utils";
import styles from "./styles.css";

function useSliderAux(
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

  const getPosition = useMemo(() => {
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
    [onChange, axis, min, max, step, double, barrier]
  );

  const getPos = useCallback((e) => {
    const clientPos = getClientPosition(e);
    const position =
      clientPos[axis] + start.current[axis] - offset.current[axis];
    return position;
  }, []);

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
    [disabled, onDragStart, handleDrag, handleDragEnd]
  );

  return {
    getPosition,
    handleMouseDown,
    handle,
    handleDrag,
    handleDragEnd,
    change
  };
}

function useSlider(double, disabled, axis, min, max, step, handles) {
  const container = useRef(null);

  if (double) {
    handles[0].barrier = useCallback((value) => value <= handles[1].value, [
      handles[1].value
    ]);
    handles[1].barrier = useCallback((value) => value >= handles[0].value, [
      handles[0].value
    ]);
  }

  const thumbs = handles.map((handle) =>
    useSliderAux(
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

      let moveSecondThumb = 0;

      if (double) {
        const thumbPositions = thumbs.map(
          (thumb) => thumb.handle.current.getBoundingClientRect()[axis] + 9
        );

        if (
          (clientPos[axis] > thumbPositions[0] &&
            clientPos[axis] < thumbPositions[1] &&
            clientPos[axis] - thumbPositions[0] >=
              thumbPositions[1] - clientPos[axis]) ||
          clientPos[axis] >= thumbPositions[1]
        )
          moveSecondThumb = 1;
      }

      addEventListeners(
        thumbs[moveSecondThumb].handleDrag,
        thumbs[moveSecondThumb].handleDragEnd
      );

      thumbs[moveSecondThumb].change(
        clientPos[axis] - rect[POSITIONS_MAP[axis]]
      );

      if (thumbs[moveSecondThumb].onDragStart) {
        thumbs[moveSecondThumb].onDragStart(e);
      }
    },
    [axis, disabled, double, thumbs]
  );

  return {
    container,
    handleTrackMouseDown,
    getPosition: thumbs[0].getPosition,
    handleMouseDown: thumbs[0].handleMouseDown,
    handle: thumbs[0].handle,
    getPosition2: thumbs[1]?.getPosition,
    handleMouseDown2: thumbs[1]?.handleMouseDown,
    handle2: thumbs[1]?.handle
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
    getPosition,
    handleMouseDown,
    handle,
    getPosition2,
    handleMouseDown2,
    handle2
  } = useSlider(double, disabled, axis, min, max, step, handles);

  const pos = getPosition;

  const pos2 = getPosition2;

  const valueStyle = {};
  const handleStyle = { top: "50%", left: "50%" };
  const handleStyle2 = { top: "50%", left: "50%" };

  handleStyle[POSITIONS_MAP[axis]] = pos[POSITIONS_MAP[axis]] + "%";

  if (!double) {
    valueStyle[DIMENSIONS_MAP[axis]] = pos[POSITIONS_MAP[axis]] + "%";
  } else {
    valueStyle[POSITIONS_MAP[axis]] = pos[POSITIONS_MAP[axis]] + "%";
    valueStyle[DIMENSIONS_MAP[axis]] =
      pos2[POSITIONS_MAP[axis]] - pos[POSITIONS_MAP[axis]] + "%";
    handleStyle2[POSITIONS_MAP[axis]] = pos2[POSITIONS_MAP[axis]] + "%";
  }

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
        <div
          ref={handle2}
          style={handleStyle2}
          className={styles.handle}
          onTouchStart={handleMouseDown2}
          onMouseDown={handleMouseDown2}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}>
          <div className={styles.thumb} />
        </div>
      )}
      <div
        className={classNames(styles[axis], styles.active)}
        style={valueStyle}
      />
      <div
        ref={handle}
        style={handleStyle}
        className={styles.handle}
        onTouchStart={handleMouseDown}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}>
        <div className={styles.thumb} />
      </div>
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
