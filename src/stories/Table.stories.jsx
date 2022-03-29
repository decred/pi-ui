import React from "react";
import { Table } from "..";
import "./page.css";

const TableObj = {
  title: "Design System/Components/Table",
  component: Table,
};

export default TableObj;

const Template = ({ children, ...args }) => <Table {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  headers: ["Type", "Amount", "Paid", "Transaction", "Status", "Date"],
  data: [
    {
      Type: "Credits 1",
      Amount: 2,
      Paid: "0.2 DCR",
      Transaction:
        "7fbd08d91e5c2ab5f03afb5ae96ab9babdef0f40a04c159f393588cb906a375f",
      Status: "Pending",
      Date: "20 Jan 2017 14:51",
    },
    {
      Type: "Credits 2",
      Amount: 2,
      Paid: "0.2 DCR",
      Transaction:
        "7fbd08d91e5c2ab5f03afb5ae96ab9babdef0f40a04c159f393588cb906a375f",
      Status: "Pending",
      Date: "20 Jan 2017 14:51",
    },
    {
      Type: "Credits 3",
      Amount: 2,
      Paid: "0.2 DCR",
      Transaction:
        "7fbd08d91e5c2ab5f03afb5ae96ab9babdef0f40a04c159f393588cb906a375f",
      Status: "Pending",
      Date: "20 Jan 2017 14:51",
    },
    {
      Type: "Credits 4",
      Amount: 2,
      Paid: "0.2 DCR",
      Transaction:
        "7fbd08d91e5c2ab5f03afb5ae96ab9babdef0f40a04c159f393588cb906a375f",
      Status: "Pending",
      Date: "20 Jan 2017 14:51",
    },
    {
      Type: "Credits 5",
      Amount: 2,
      Paid: "0.2 DCR",
      Transaction:
        "7fbd08d91e5c2ab5f03afb5ae96ab9babdef0f40a04c159f393588cb906a375f",
      Status: "Pending",
      Date: "20 Jan 2017 14:51",
    },
  ],
};

export const WithLinesPerPage = Template.bind({});
WithLinesPerPage.args = {
  linesPerPage: 2,
  headers: ["Type", "Amount", "Paid", "Transaction", "Status", "Date"],
  data: [
    {
      Type: "Credits 1",
      Amount: 2,
      Paid: "0.2 DCR",
      Transaction:
        "7fbd08d91e5c2ab5f03afb5ae96ab9babdef0f40a04c159f393588cb906a375f",
      Status: "Pending",
      Date: "20 Jan 2017 14:51",
    },
    {
      Type: "Credits 2",
      Amount: 2,
      Paid: "0.2 DCR",
      Transaction:
        "7fbd08d91e5c2ab5f03afb5ae96ab9babdef0f40a04c159f393588cb906a375f",
      Status: "Pending",
      Date: "20 Jan 2017 14:51",
    },
    {
      Type: "Credits 3",
      Amount: 2,
      Paid: "0.2 DCR",
      Transaction:
        "7fbd08d91e5c2ab5f03afb5ae96ab9babdef0f40a04c159f393588cb906a375f",
      Status: "Pending",
      Date: "20 Jan 2017 14:51",
    },
    {
      Type: "Credits 4",
      Amount: 2,
      Paid: "0.2 DCR",
      Transaction:
        "7fbd08d91e5c2ab5f03afb5ae96ab9babdef0f40a04c159f393588cb906a375f",
      Status: "Pending",
      Date: "20 Jan 2017 14:51",
    },
    {
      Type: "Credits 5",
      Amount: 2,
      Paid: "0.2 DCR",
      Transaction:
        "7fbd08d91e5c2ab5f03afb5ae96ab9babdef0f40a04c159f393588cb906a375f",
      Status: "Pending",
      Date: "20 Jan 2017 14:51",
    },
  ],
};
