import React from "react";
import { ButtonIcon } from "..";
import "./page.css";
import styles from "./buttonicon.module.css";

const ButtonIconObj = {
  title: "Design System/Components/ButtonIcon",
  component: ButtonIcon,
};

export default ButtonIconObj;

const Template = ({ children, ...args }) => <ButtonIcon {...args} />;

export const Basic = () => (
  <div style={{ display: "flex", justifyContent: "space-around" }}>
    <ButtonIcon type="mail" />
    <ButtonIcon type="link" />
    <ButtonIcon type="chart" />
    <ButtonIcon type="markdown" viewBox="0 0 208 128" />
    <ButtonIcon type="search" />
    <ButtonIcon type="sendMax" />
    <ButtonIcon type="copyToClipboard" iconBackgroundColor="#2970ff" />
    <ButtonIcon
      type="accounts"
      className={styles.blueButtonIcon}
      iconColor="white"
    />
    <ButtonIcon type="qr" iconColor="#2970ff" />
    <ButtonIcon
      type="plus"
      className={styles.blueButtonIcon}
      iconColor="#f7f8f9"
    />
    <ButtonIcon
      type="cancel"
      className={styles.darkBlueButtonIcon}
      iconColor="#f7f8f9"
    />
    <ButtonIcon type="refresh" iconColor="#3D5873" />
    <ButtonIcon type="searchBlock" />
  </div>
);

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: "true",
  type: "link",
};

export const Loading = Template.bind({});

Loading.args = {
  loading: "true",
  type: "link",
};

export const WithText = Template.bind({});

WithText.args = {
  type: "create",
  iconColor: "#2970FF",
  text: "Create a New Wallet",
};
