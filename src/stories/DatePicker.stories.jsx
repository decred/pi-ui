import React, { useState } from "react";
import { DatePicker } from "..";
import "./page.css";

const DatePickerObj = {
  title: "Design System/Components/DatePicker",
  component: DatePicker,
};

export default DatePickerObj;

const ControlledTemplate = ({ children, ...args }) => {
  const [value, setValue] = useState({ year: 2019, month: 11, day: 15 });
  const onChange = (year, month, day) => {
    if (!!year && !!month && !!day) {
      setValue({ year, month, day });
    }
  };

  return <DatePicker {...args} value={value} onChange={onChange} />;
};

export const FullyControlled = ControlledTemplate.bind({});
FullyControlled.args = {};

const years = {
  min: { year: 2018, month: 1, day: 25 },
  max: { year: 2020, month: 2, day: 4 },
};

export const FullyControlledMinMax = ControlledTemplate.bind({});
FullyControlledMinMax.args = {
  years,
};
