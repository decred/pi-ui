import React from "react";
import PropTypes from "prop-types";
import { POSITIONS_MAP } from "./helpers";
import styles from "./styles.css";

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
