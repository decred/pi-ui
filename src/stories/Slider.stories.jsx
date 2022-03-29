import React, { useState } from "react";
import { Slider, Checkbox, NumberInput } from "..";
import "./page.css";

const SliderObj = {
  title: "Design System/Components/Slider",
  component: Slider,
};

export default SliderObj;

const FullyControlledTemplate = ({ children, ...args }) => {
  const [coordinates, setCoordinates] = useState({ handle1: 0, handle2: 40 });
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [disabled, setDisabled] = useState(false);
  return (
    <>
      <Slider
        disabled={disabled}
        axis={"y"}
        max={max}
        min={min}
        handles={[
          {
            value: coordinates.handle1,
            onChange: (value) =>
              setCoordinates((coordinates) => ({
                ...coordinates,
                handle1: value,
              })),
          },
        ]}
        {...args}
      />
      <br />
      <br />
      <Checkbox
        label="Disabled"
        id="single-vertical-slider-disabled"
        checked={disabled}
        onChange={() => setDisabled(!disabled)}
      />
      <NumberInput
        label="Minimum"
        id="single-vertical-slider-min"
        value={min}
        onChange={(e) => {
          const newLimit = parseInt(e.target.value);
          if (newLimit < max) setMin(newLimit);
        }}
      />
      <br />
      <NumberInput
        label="Maximum"
        id="single-vertical-slider-max"
        value={max}
        onChange={(e) => {
          const newLimit = parseInt(e.target.value);
          if (newLimit > min) setMax(newLimit);
        }}
      />
    </>
  );
};

const FullyControlledDoubleTemplate = ({ children, ...args }) => {
  const [coordinates, setCoordinates] = useState({ handle1: 0, handle2: 40 });
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [disabled, setDisabled] = useState(false);
  return (
    <>
      <Slider
        double={true}
        disabled={disabled}
        axis={"x"}
        max={max}
        min={min}
        handles={[
          {
            value: coordinates.handle1,
            onChange: (value) =>
              setCoordinates((coordinates) => ({
                ...coordinates,
                handle1: value,
              })),
          },
          {
            value: coordinates.handle2,
            onChange: (value) =>
              setCoordinates((coordinates) => ({
                ...coordinates,
                handle2: value,
              })),
          },
        ]}
      />
      <br />
      <br />
      <Checkbox
        label="Disabled"
        id="double-horizontal-slider-disabled"
        checked={disabled}
        onChange={() => setDisabled(!disabled)}
      />
      <NumberInput
        label="Minimum"
        id="double-horizontal-slider-min"
        value={min}
        onChange={(e) => {
          const newLimit = parseInt(e.target.value);
          if (newLimit < max) setMin(newLimit);
        }}
      />
      <br />
      <NumberInput
        label="Maximum"
        id="double-horizontal-slider-max"
        value={max}
        onChange={(e) => {
          const newLimit = parseInt(e.target.value);
          if (newLimit > min) setMax(newLimit);
        }}
      />
    </>
  );
};

export const ControlledVerticalSlider = FullyControlledTemplate.bind({});
ControlledVerticalSlider.args = {};

export const ControlledHorizontalDoubleSlider =
  FullyControlledDoubleTemplate.bind({});
ControlledHorizontalDoubleSlider.args = {};
