import React from "react";
import { Message } from "..";
import "./page.css";

const MessageObj = {
  title: "Design System/Components/Message",
  component: Message,
};

export default MessageObj;

const Template = ({ children, ...args }) => (
  <Message {...args}>{children}</Message>
);

export const Info = Template.bind({});
Info.args = {
  children: "Test Message",
  kind: "info",
};
export const Warning = Template.bind({});
Warning.args = {
  children: "Test Message",
  kind: "warning",
};
export const Error = Template.bind({});
Error.args = {
  children: "Test Message",
  kind: "error",
};
export const Success = Template.bind({});
Success.args = {
  children: "Test Message",
  kind: "success",
};
export const Blocked = Template.bind({});
Blocked.args = {
  children: "Test Message",
  kind: "blocked",
};
