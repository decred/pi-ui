import React from "react";
import { Card } from "..";
import "./page.css";

const CardObj = {
  title: "Design System/Components/Card",
  component: Card,
};

export default CardObj;

const Template = ({ children, ...args }) => <Card {...args}>{children}</Card>;

export const Basic = Template.bind({});
Basic.args = {
  children: "I am a card",
};

export const WithPadding = () => (
  <>
    <Card paddingSize="small">Card with small padding</Card>
    <br></br>
    <Card paddingSize="medium">Card with medium padding</Card>
    <br></br>
    <Card paddingSize="large">Card with large padding</Card>
  </>
);

export const WithMarker = Template.bind({});
WithMarker.args = {
  children: "Card with a marker",
  paddingSize: "small",
  marker: true,
};
