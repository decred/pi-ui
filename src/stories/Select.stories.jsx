import React from "react";
import { Select } from "..";
import "./page.css";

const SelectObj = {
  title: "Design System/Components/Select",
  component: Select,
};

export default SelectObj;

const Template = ({ children, ...args }) => <Select {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  options: [
    {
      value: "top",
      label: "Top",
    },
    {
      value: "new",
      label: "New",
    },
    {
      value: "old",
      label: "Old",
    },
  ],
};

export const Small = Template.bind({});
Small.args = {
  width: 100,
  options: [
    {
      value: "top",
      label: "Top",
    },
    {
      value: "new",
      label: "New",
    },
    {
      value: "old",
      label: "Old",
    },
  ],
};

export const Mobile = Template.bind({});
Mobile.args = {
  isMobile: true,
  options: [
    {
      value: "top",
      label: "Top",
    },
    {
      value: "new",
      label: "New",
    },
    {
      value: "old",
      label: "Old",
    },
  ],
};

const customSt = {
  control: () => ({
    borderRadius: "none",
    borderLeft: "none",
    borderRight: "none",
    borderTop: "none",
  }),
  dropdownIndicator: () => ({
    paddingRight: 0,
  }),
};

export const CustomStyles = Template.bind({});
CustomStyles.args = {
  customStyles: customSt,
  options: [
    {
      value: "top",
      label: "Top",
    },
    {
      value: "new",
      label: "New",
    },
    {
      value: "old",
      label: "Old",
    },
  ],
};
