import React from 'react';
import { Container, Header, Sidebar, TopBanner, Main, PageDetails, SideBanner, useTheme } from "pi-ui";

const App = () => {
  useTheme();
  return (
    <Container style={{backgroundColor: "darkseagreen" }}>
      <Header style={{ backgroundColor: "paleturquoise" }}>
        <div>Logo</div>
        <div>User</div>
      </Header>
      <TopBanner style={{ backgroundColor: "pink" }}>
        <PageDetails style={{ backgroundColor: "lightsalmon" }}>
          Page Details
        </PageDetails>
        <SideBanner style={{ backgroundColor: "palegreen" }}>
          Search Box
        </SideBanner>
      </TopBanner>
      <Sidebar style={{ backgroundColor: "palegoldenrod" }}>
        Sidebar
      </Sidebar>
      <Main style={{ backgroundColor: "palevioletred" }}>
        Main Content
      </Main>
    </Container>
  );
}

export default App;
