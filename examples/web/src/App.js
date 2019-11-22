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

const App = () => {
  const [themeMode, setThemeMode] = useState("dark");
  const [theme, setTheme] = useTheme();
  if (!theme) {
    setTheme(defaultDarkTheme);
  }
  const handleToggleTheme = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
      setTheme(defaultDarkTheme);
    } else {
      setThemeMode("light");
      setTheme(defaultLightTheme);
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
