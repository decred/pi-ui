import React, { useState } from "react";
import {
  Container,
  Header,
  Sidebar,
  TopBanner,
  Main,
  PageDetails,
  Button,
  defaultLightTheme,
  defaultDarkTheme,
  useTheme
} from "pi-ui";

const themes = {
  light: defaultLightTheme,
  dark: defaultDarkTheme
};

const App = () => {
  const [themeMode, setThemeMode] = useState("dark");
  const [theme, setTheme] = useTheme(themes[themeMode]);
  const handleToggleTheme = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
      setTheme(themes[dark]);
    } else {
      setThemeMode("light");
      setTheme(themes[light]);
    }
  }
  return (
    <Container>
      <Header>
        <div>Logo</div>
        <div>User</div>
      </Header>
      <TopBanner>
        <PageDetails>Page Details</PageDetails>
      </TopBanner>
      <Sidebar>Sidebar</Sidebar>
      <Main>
        <Button onClick={handleToggleTheme}>Toggle theme</Button>
      </Main>
    </Container>
  );
};

export default App;
