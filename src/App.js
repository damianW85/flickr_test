import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";
import FlickrComponent from "./components/FlickrComponent";
import "./App.css";

injectGlobal`
  @font-face {
    font-family: 'BlueSkyStandard';
    src: url('_fonts/BlueSkyStandard-Regular.eot');
    src:
        url('_fonts/BlueSkyStandard-Regular.woff') format('woff'),
        url('_fonts/BlueSkyStandard-Regular.svg') format('svg'),
        url('_fonts/BlueSkyStandard-Regular.eot?#iefix') format('embedded-opentype');
    font-style: normal;
  }

  @font-face {
    font-family: 'BlueSkyStandard';
    src: url('_fonts/BlueSkyStandard-Bold.eot');
    src:
        url('_fonts/BlueSkyStandard-Bold.woff') format('woff'),
        url('_fonts/BlueSkyStandard-Bold.svg') format('svg'),
        url('_fonts/BlueSkyStandard-Bold.eot?#iefix') format('embedded-opentype');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'BlueSkyStandard';
    src: url('_fonts/BlueSkyStandard-Light.eot');
    src:
        url('_fonts/BlueSkyStandard-Light.woff') format('woff'),
        url('_fonts/BlueSkyStandard-Light.svg') format('svg'),
        url('_fonts/BlueSkyStandard-Light.eot?#iefix') format('embedded-opentype');
    font-weight: lighter;
    font-style: normal;
  }
`;

const AppWrapper = styled.div`
  font-family: BlueSkyStandard;
  width: 100%;
  color: #ffffff;
  font-weight: bold;
  max-width: 2400px;
  margin: 0 auto;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper className="App">
        <FlickrComponent />
      </AppWrapper>
    );
  }
}

export default App;
