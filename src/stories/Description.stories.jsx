import React from "react";
import { Description } from "..";
import "./page.css";

const DescriptionObj = {
  title: "Design System/Components/Description",
  component: Description,
};

export default DescriptionObj;

const Template = ({...args }) => <Description {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  body: "Test Description"
};
