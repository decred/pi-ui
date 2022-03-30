import React from "react";
import { StatusBar, Icon } from "..";
import "./page.css";

const StatusBarObj = {
  title: "Design System/Components/StatusBar",
  component: StatusBar,
};

export default StatusBarObj;

const Template = ({ children, ...args }) => <StatusBar {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  status: [
    {
      label: "Yes",
      amount: 300,
      color: "green",
    },
    {
      label: "No",
      amount: 200,
      color: "orange",
    },
    {
      label: "Maybe",
      amount: 500,
      color: "blue",
    },
  ],
  markerPosition: "50%",
  markerTooltipText: "50% Yes votes required for approval",
  max: 5000,
};

export const NoMarker = Template.bind({});
NoMarker.args = {
  status: [
    {
      label: "Yes",
      amount: 300,
      color: "green",
    },
    {
      label: "No",
      amount: 200,
      color: "orange",
    },
    {
      label: "Maybe",
      amount: 500,
      color: "blue",
    },
  ],
  showMarker: false,
  max: 5000,
};

export const Custom = Template.bind({});
Custom.args = {
  status: [
    {
      label: "Local",
      amount: 9.45931345,
      color: "green",
      renderAmountComponent: <span>9.45931345 DCR</span>,
    },
    {
      label: "Remote",
      amount: 1.45931345,
      color: "orange",
      renderAmountComponent: <span>1.45931345 DCR</span>,
    },
  ],
  markerPosition: "50%",
  max: 10.9431937482,
  layout: "balance",
  showPercent: false,
  renderStatusInfoComponent: <div></div>,
  renderMarkerComponent: (
    <div
      style={{
        width: "35px",
        height: "35px",
        maxWidth: "35px",
        marginTop: "-13px",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Icon type="checkmark" size="md" />
    </div>
  ),
};
