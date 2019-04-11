import React, { useState } from 'react';
import { Container, Header, Sidebar, TopBanner, Main, PageDetails, SideBanner, Button, defaultLightTheme, defaultDarkTheme, useTheme } from "pi-ui";

const themes = {
  light: defaultLightTheme,
  dark: defaultDarkTheme
}

const App = () => {
  const [theme, setTheme] = useState("dark");
  const handleToggleTheme = () => theme === "light" ? setTheme("dark") : setTheme("light");
  useTheme(themes[theme]);
  return (
    <Container>
      <Header>
        <div>Logo</div>
        <div>User</div>
      </Header>
      <TopBanner>
        <PageDetails>
          Page Details
        </PageDetails>
        <SideBanner>
          Search Box
        </SideBanner>
      </TopBanner>
      <Sidebar>
        Sidebar
      </Sidebar>
      <Main>
        <Button onClick={handleToggleTheme}>Toggle theme</Button>
      </Main>
    </Container>
  );
}

export default App;
