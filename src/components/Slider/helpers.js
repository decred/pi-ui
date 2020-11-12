export const DIMENSIONS_MAP = {
  x: "width",
  y: "height"
};

export const POSITIONS_MAP = {
  x: "left",
  y: "top"
};

export const POSITIONS_MAP_CAPITALIZED = {
  x: "Left",
  y: "Top"
};

export function getClientPosition(e) {
  return e.touches?.length
    ? {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    : {
        x: e.clientX,
        y: e.clientY
      };
}

export function addEventListeners(handleDrag, handleDragEnd) {
  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("touchmove", handleDrag, { passive: false });

  document.addEventListener("mouseup", handleDragEnd);
  document.addEventListener("touchend", handleDragEnd);
  document.addEventListener("touchcancel", handleDragEnd);
}
