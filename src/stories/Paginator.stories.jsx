import React from "react";
import { Paginator } from "..";
import "./page.css";

const PaginatorObj = {
  title: "Design System/Components/Paginator",
  component: Paginator,
};

export default PaginatorObj;

const Template = ({ children, ...args }) => <Paginator {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  pageCount: 20,
};

export const CustomPaginationGap = Template.bind({});
CustomPaginationGap.args = {
  pageCount: 20,
  paginationGap: 0,
};

export const CustomMarginPagesDisplayed = Template.bind({});
CustomMarginPagesDisplayed.args = {
  pageCount: 20,
  paginationGap: 0,
  marginPagesDisplayed: 5,
};
