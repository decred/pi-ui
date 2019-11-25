import React from "react";
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
  useTheme
} from "pi-ui";

const ButtonWrapper = () => {
  
  const { themeName, setThemeName } = useTheme();
  
  const handleToggleTheme = () => {
    if (themeName === "light") {
      setThemeName("dark");
    } else {
      setThemeName("light");
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
