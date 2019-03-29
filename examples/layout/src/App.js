import React, { Component } from 'react';
import { Container, Header, Sidebar, TopBanner, Main, PageDetails, SearchBox, Button, P, H1, H2  } from "pi-ui";

class App extends Component {
  render() {
    return (
      <Container style={{backgroundColor: "darkseagreen" }}>
        <Header style={{ backgroundColor: "paleturquoise" }}>
          <div>Logo</div>
          <div>User</div>
        </Header>
        <TopBanner style={{ backgroundColor: "pink" }}>
          <PageDetails style={{ backgroundColor: "lightsalmon" }}>
            Header
          </PageDetails>
          <SearchBox style={{ backgroundColor: "palegreen" }}>
            Search Box
          </SearchBox>
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
}

export default App;
