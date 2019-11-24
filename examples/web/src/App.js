import React, { useContext } from "react";
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
  ThemeProvider,
  ThemeContext
} from "pi-ui";

const ButtonWrapper = () => {
  
  const { useThemeName } = useContext(ThemeContext);
  const [themeMode, setThemeMode] = useThemeName;
  
  const handleToggleTheme = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  }

  return (
    <Button onClick={handleToggleTheme}>Toggle theme</Button>
  )
}

const App = () => {
  return (
    <ThemeProvider themes={{ dark: defaultDarkTheme, light: defaultLightTheme }} defaultThemeName="dark">
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
          <ButtonWrapper />
        </Main>
      </Container>
    </ThemeProvider>
  );
};

export default App;
