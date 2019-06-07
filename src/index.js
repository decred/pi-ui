import SegoeUI from "./assets/fonts/segoeui/segoeui.woff";
import SourceSansProRegular from "./assets/fonts/source_sans_pro/SourceSansPro-Regular.ttf";
import SourceSansProSemiBold from "./assets/fonts/source_sans_pro/SourceSansPro-SemiBold.ttf";
import SourceSansProLight from "./assets/fonts/source_sans_pro/SourceSansPro-Light.ttf";

import "./css/base.css";

document.documentElement.style = `
@font-face {
  font-family: "Segoe UI";
  src: url(${SegoeUI}) format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Source Sans Pro";
  src: url(${SourceSansProSemiBold})
    format("ttf");
  font-weight: var(--font-weight-semi-bold);
  font-style: normal;
}

@font-face {
  font-family: "Source Sans Pro";
  src: url(${SourceSansProRegular})
    format("ttf");
  font-weight: var(--font-weight-regular);
  font-style: normal;
}

@font-face {
  font-family: "Source Sans Pro";
  src: url(${SourceSansProLight})
    format("ttf");
  font-weight: var(--font-weight-light);
  font-style: normal;
}
`;
export { default as H1 } from "./components/Typography/H1.jsx";
export { default as H2 } from "./components/Typography/H2.jsx";
export { default as H3 } from "./components/Typography/H3.jsx";
export { default as H4 } from "./components/Typography/H4.jsx";
export { default as P } from "./components/Typography/P.jsx";
export { default as Link } from "./components/Link/Link.jsx";
export { default as Button } from "./components/Button/Button.jsx";
export { default as TextInput } from "./components/TextInput/TextInput.jsx";
export {
  default as SearchInput
} from "./components/SearchInput/SearchInput.jsx";
export { default as Card } from "./components/Card/Card.jsx";
export { default as Message } from "./components/Message/Message.jsx";
export { default as Modal } from "./components/Modal/Modal.jsx";
export { default as Tabs } from "./components/Tabs/Tabs.jsx";
export { default as Tab } from "./components/Tabs/Tab.jsx";
export { default as Table } from "./components/Table/Table.jsx";
export { default as Container } from "./components/Layout/Container.jsx";
export { default as Header } from "./components/Layout/Header.jsx";
export { default as Sidebar } from "./components/Layout/Sidebar.jsx";
export { default as TopBanner } from "./components/Layout/TopBanner.jsx";
export { default as Main } from "./components/Layout/Main.jsx";
export { default as PageDetails } from "./components/Layout/PageDetails.jsx";
export { default as SideBanner } from "./components/Layout/SideBanner.jsx";
export { default as StatusBar } from "./components/StatusBar/StatusBar.jsx";
export { default as Spinner } from "./components/Spinner/Spinner.jsx";
export { default as StatusTag } from "./components/StatusTag/StatusTag.jsx";
export { default as Icon } from "./components/Icon/Icon.jsx";
export { default as Tooltip } from "./components/Tooltip/Tooltip.jsx";
export { default as defaultLightTheme } from "./theme/lightTheme";
export { default as defaultDarkTheme } from "./theme/darkTheme";
export { default as useTheme } from "./theme/useTheme";
export * from "./utils";
