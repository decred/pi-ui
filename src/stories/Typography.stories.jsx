import React from "react";
import { H1, H2, H3, H4, H5, H6, P, Text, TextHighlighted } from "..";
import "./page.css";

const TypographyObj = {
  title: "Design System/Components/Typography",
};

export default TypographyObj;

const H1Template = ({ children, ...args }) => <H1 {...args}>{children}</H1>;
const H2Template = ({ children, ...args }) => <H2 {...args}>{children}</H2>;
const H3Template = ({ children, ...args }) => <H3 {...args}>{children}</H3>;
const H4Template = ({ children, ...args }) => <H4 {...args}>{children}</H4>;
const H5Template = ({ children, ...args }) => <H5 {...args}>{children}</H5>;
const H6Template = ({ children, ...args }) => <H6 {...args}>{children}</H6>;
const PTemplate = ({ children, ...args }) => <P {...args}>{children}</P>;
const TextTemplate = ({ children, ...args }) => (
  <Text {...args}>{children}</Text>
);
const TextHighlightedTemplate = ({ children, ...args }) => (
  <TextHighlighted {...args}>{children}</TextHighlighted>
);

export const Header1 = H1Template.bind({});
Header1.args = {
  children: "Header1 - 28px - Regular",
};
export const Header2 = H2Template.bind({});
Header2.args = {
  children: "Header2 - 24px - Semibold",
};
export const Header3 = H3Template.bind({});
Header3.args = {
  children: "Header3 - 20px - Semibold",
};
export const Header4 = H4Template.bind({});
Header4.args = {
  children: "Header4 - 18px - Semibold",
};
export const Header5 = H5Template.bind({});
Header5.args = {
  children: "Header5 - 16px - Semibold",
};
export const Header6 = H6Template.bind({});
Header6.args = {
  children: "Header6 - 13px - Semibold",
};
export const Paragraph = PTemplate.bind({});
Paragraph.args = {
  children: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias
  voluptate delectus eius nesciunt porro! Eum expedita voluptate dolor
  dignissimos autem recusandae quia, quasi, beatae asperiores, aliquam
  maxime reiciendis earum voluptatum`,
};
export const RegularText = TextTemplate.bind({});
RegularText.args = {
  children: "Regular text",
};
export const RegularTextHighlighted = TextHighlightedTemplate.bind({});
RegularTextHighlighted.args = {
  children: "Regular highlighted text",
};
