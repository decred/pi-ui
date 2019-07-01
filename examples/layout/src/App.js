import React from "react";
import {
  Container,
  Header,
  Sidebar,
  TopBanner,
  Main,
  PageDetails,
  useTheme
} from "pi-ui";

const App = () => {
  useTheme();
  return (
    <Container style={{ backgroundColor: "darkseagreen" }}>
      <Header style={{ backgroundColor: "paleturquoise" }}>
        <div>Logo</div>
        <div>User</div>
      </Header>
      <TopBanner style={{ backgroundColor: "pink" }}>
        <PageDetails style={{ backgroundColor: "lightsalmon" }}>
          Page Details
        </PageDetails>
      </TopBanner>
      <Sidebar style={{ backgroundColor: "palegoldenrod" }}>Sidebar</Sidebar>
      <Main style={{ backgroundColor: "palevioletred" }}>Main Content</Main>
    </Container>
  );
};

export default App;
