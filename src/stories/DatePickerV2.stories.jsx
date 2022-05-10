import React, { useState } from "react";
import { DatePickerV2 } from "..";
import "./page.css";

const DatePickerV2Obj = {
  title: "Design System/Components/DatePickerV2",
  component: DatePickerV2,
};

export default DatePickerV2Obj;

const ControlledTemplate = ({ children, ...args }) => {
  const [value, setValue] = useState({ year: 2022, month: 5, day: 15 });

  return <DatePickerV2 {...args} value={value} onChange={setValue} />;
};

export const FullyControlled = ControlledTemplate.bind({});
FullyControlled.args = {};

const args = {
  minTimestamp: Date.now(),
  // One Year From now
  maxTimestamp: Date.now() + 31536000000,
};

export const FullyControlledMinMax = ControlledTemplate.bind({});
FullyControlledMinMax.args = args;
