import React from "react";
import { BoxTextInput } from "..";
import "./page.css";

const BoxTextInputObj = {
  title: "Design System/Components/BoxTextInput",
  component: BoxTextInput,
};

export default BoxTextInputObj;
const Template = ({ children, ...args }) => <BoxTextInput {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  placeholder: "Censorship Token",
  name: "search",
};

export const Error = Template.bind({});
Error.args = {
  placeholder: "Censorship Token",
  name: "search",
  error: "Oops, something went wrong",
};

export const Rounded = Template.bind({});
Rounded.args = {
  placeholder: "Censorship Token",
  name: "search",
  rounded: true,
};

export const Searchable = Template.bind({});
Searchable.args = {
  placeholder: "Censorship Token",
  name: "search",
  searchInput: true,
};
