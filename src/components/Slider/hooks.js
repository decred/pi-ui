import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  getClientPosition,
  addEventListeners,
  DIMENSIONS_MAP,
  POSITIONS_MAP,
  POSITIONS_MAP_CAPITALIZED
} from "./helpers";

function useSliderHandle(
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
  const start = useRef();
  const offset = useRef();

  useEffect(() => {
    if (value > max) onChange(max);
    if (value < min) onChange(min);
  }, [value, min, max, onChange]);

  if (double && !barrier(value)) {
    onChange(value - step);
  }

  const position = useMemo(() => {
    let newValue = ((value - min) / (max - min)) * 100;

    if (newValue > 100) newValue = 100;
    if (newValue < 0) newValue = 0;

    return axis === "x"
      ? { top: 0, left: newValue }
      : { top: newValue, left: 0 };
  }, [value, min, max, axis]);

  const change = (position) => {
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
  };

  const getPos = (e) => {
    const clientPos = getClientPosition(e)[axis];
    const position = clientPos + start.current - offset.current;
    return position;
  };

  const handleDrag = (e) => {
    if (disabled) return;

    e.preventDefault();
    change(getPos(e));
  };

  const handleDragEnd = (e) => {
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
  };

  const handleMouseDown = (e) => {
    if (disabled) return;

    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    const dom = handle.current;
    const clientPos = getClientPosition(e)[axis];

    start.current = dom[`offset${POSITIONS_MAP_CAPITALIZED[axis]}`];
    offset.current = clientPos;

    addEventListeners(handleDrag, handleDragEnd);

    if (onDragStart) {
      onDragStart(e);
    }
  };

  return {
    position,
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
    const [leftHandle, rightHandle] = handles;
    leftHandle.barrier = useCallback((value) => value <= rightHandle.value, [
      rightHandle.value
    ]);
    rightHandle.barrier = useCallback((value) => value >= leftHandle.value, [
      leftHandle.value
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

  const handleTrackMouseDown = (e) => {
    if (disabled) return;

    e.preventDefault();
    const clientPos = getClientPosition(e)[axis];
    const rect = container.current.getBoundingClientRect();

    let handleIndex = 0;

    if (double) {
      const [leftHandlePosition, rightHandlePosition] = handleHooks.map(
        (handleHook) => {
          const rect = handleHook.handle.current.getBoundingClientRect();
          return rect[axis] + rect[DIMENSIONS_MAP[axis]] / 2;
        }
      );

      if (
        (clientPos > leftHandlePosition &&
          clientPos < rightHandlePosition &&
          clientPos - leftHandlePosition >= rightHandlePosition - clientPos) ||
        clientPos >= rightHandlePosition
      )
        handleIndex = 1;
    }

    addEventListeners(
      handleHooks[handleIndex].handleDrag,
      handleHooks[handleIndex].handleDragEnd
    );

    handleHooks[handleIndex].change(clientPos - rect[POSITIONS_MAP[axis]]);

    if (handleHooks[handleIndex].onDragStart) {
      handleHooks[handleIndex].onDragStart(e);
    }
  };

  const valueStyle = {};

  const position = POSITIONS_MAP[axis];

  const leftHandlePositionAtAxis = handleHooks[0].position[position];

  if (double) {
    const rightHandlePositionAtAxis = handleHooks[1].position[position];

    valueStyle[position] = leftHandlePositionAtAxis + "%";

    valueStyle[DIMENSIONS_MAP[axis]] =
      rightHandlePositionAtAxis - leftHandlePositionAtAxis + "%";
  } else {
    valueStyle[DIMENSIONS_MAP[axis]] = leftHandlePositionAtAxis + "%";
  }

  return {
    container,
    handleTrackMouseDown,
    valueStyle,
    handleHooks
  };
}

export default useSlider;
