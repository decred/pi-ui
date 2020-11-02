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
  useTheme,
  DEFAULT_LIGHT_THEME_NAME,
  DEFAULT_DARK_THEME_NAME,
} from "pi-ui";

const ButtonWrapper = () => {
  const { themeName, setThemeName } = useTheme();

  const handleToggleTheme = () => {
    if (themeName === DEFAULT_LIGHT_THEME_NAME) {
      setThemeName(DEFAULT_DARK_THEME_NAME);
    } else {
      setThemeName(DEFAULT_LIGHT_THEME_NAME);
    }
  };

  return <Button onClick={handleToggleTheme}>Toggle theme</Button>;
};

const App = () => {
  return (
    <ThemeProvider
      themes={{
        [DEFAULT_DARK_THEME_NAME]: defaultDarkTheme,
        [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme,
      }}
      defaultThemeName={DEFAULT_DARK_THEME_NAME}>
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
