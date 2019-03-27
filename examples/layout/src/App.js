import React, { Component } from 'react';
import { Container, Header, Sidebar, TopBanner, Main, PageDetails, SearchBox, Button, P, H1, H2  } from "pi-ui";

class App extends Component {
  render() {
    return (
      <Container className="container">
        <Header className="header">
          <div>Logo</div>
          <div>
            <span>credits</span>
            <span>user</span>
          </div>
        </Header>
        <TopBanner className="topBanner">
          <PageDetails className="pageDetails">
            <H1>Big Header</H1>
          </PageDetails>
          <SearchBox className="searchBox">
            Search
          </SearchBox>
        </TopBanner>
        <Sidebar className="sidebar">
          <Button style={{ width: "100%", marginBottom: "10px" }}>
            Test
          </Button>
          <div style={{ marginBottom: "10px", backgroundColor: "#fff"}}>
            <H2>About Politeia</H2>
            <P>Details</P>
            <P>Details</P>
            <P>Details</P>
          </div>
          <div style={{ backgroundColor: "#fff" }}>
            <H2>Resources</H2>
            <P>Details</P>
            <P>Details</P>
            <P>Details</P>
            <P>Details</P>
            <P>Details</P>
          </div>
        </Sidebar>
        <Main className="main">
          <P>Stuff</P>
          <P>Stuff</P>
          <P>Stuff</P>
          <P>Stuff</P>
          <P>Stuff</P>
        </Main>
      </Container>
    );
  }
}

export default App;
