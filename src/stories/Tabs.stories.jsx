import React, { useState } from "react";
import { Tabs, Tab } from "..";
import "./page.css";

const TabsObj = {
  title: "Design System/Components/Tabs",
  component: Tabs,
};

export default TabsObj;

const Template = ({ children, ...args }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const onSelectTab = (index) => {
    setActiveTabIndex(index);
  };
  return (
    <Tabs activeTabIndex={activeTabIndex} {...args} onSelectTab={onSelectTab}>
      {children}
    </Tabs>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  children: [
    <Tab label="tab 1" key={0} />,
    <Tab label="tab 2" key={1} />,
    <Tab label="tab 3" key={2} />,
  ],
};

export const Secondary = Template.bind({});
Secondary.args = {
  kind: "secondary",
  children: [
    <Tab label="tab 1" key={0} />,
    <Tab label="tab 2" key={1} />,
    <Tab label="tab 3" key={2} />,
  ],
};

export const Vertical = Template.bind({});
Vertical.args = {
  mode: "vertical",
  children: [
    <Tab label="tab 1" key={0} />,
    <Tab label="tab 2" key={1} />,
    <Tab label="tab 3" key={2} />,
  ],
};

export const WithCount = Template.bind({});
WithCount.args = {
  children: [
    <Tab label="tab 1" key={0} count={1} />,
    <Tab label="tab 2" key={1} count={4} />,
  ],
};

export const WithContent = Template.bind({});
WithContent.args = {
  children: [
    <Tab label="tab 1" key={0} count={1}>
      tab content 1
    </Tab>,
    <Tab label="tab 2" key={1} count={4}>
      tab content 2
    </Tab>,
  ],
};

export const DropdownMode = Template.bind({});
DropdownMode.args = {
  mode: "dropdown",
  children: [
    <Tab label="tab 1" key={0} count={1}>
      tab content 1
    </Tab>,
    <Tab label="tab 2" key={1} count={4}>
      tab content 2
    </Tab>,
  ],
};

export const SlideAnimation = Template.bind({});
SlideAnimation.args = {
  contentAnimation: "slide",
  children: [
    <Tab label="tab 1" key={0} count={1}>
      tab content 1
    </Tab>,
    <Tab label="tab 2" key={1} count={4}>
      tab content 2
    </Tab>,
  ],
};

export const NoAnimation = Template.bind({});
NoAnimation.args = {
  contentAnimation: "none",
  children: [
    <Tab label="tab 1" key={0} count={1}>
      tab content 1
    </Tab>,
    <Tab label="tab 2" key={1} count={4}>
      tab content 2
    </Tab>,
  ],
};
