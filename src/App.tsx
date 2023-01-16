/** @jsxImportSource @emotion/react */
/* eslint-disable  */
import { HotkeysProvider, Spinner } from "@blueprintjs/core";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { ConfigProvider } from "react-avatar";
import { Fill, ViewPort } from "react-spaces";
import "./App.css";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import AuthProvider from "./components/AuthProvider";
import ErrorBoundary from "./components/common/ErrorBoundary";

const App = () => {
  const AppContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
  });

  return (
    <AppContainer>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </AppContainer>
  );
};

const MainContent = () => {
  const splitter = css(`
  .spaces-resize-handle {
      background-color: #F6F7F9
  }
`);
  const [loading] = useState(false);
  const SpinnerContainer = styled.div({
    display: "flex",
    justifyContent: "center",
    height: "100%",
  });
  const renderContent = () => {
    if (loading)
      return (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      );
    return <AppRoutes />;
  };
  return (
    <ConfigProvider
      colors={[
        "#1F4B99",
        "#3A729E",
        "#6096A1",
        "#93B9A2",
        "#D7D7A1",
        "#F8CE87",
        "#E7A55D",
        "#D27D3A",
        "#B9561F",
        "#9E2B0E",
      ]}
      avatarRedirectUrl="https://avatar-redirect.appspot.com"
    >
      <HotkeysProvider>
        <ViewPort className="App" css={splitter}>
          <Fill>
            <ErrorBoundary>{renderContent()}</ErrorBoundary>
          </Fill>
        </ViewPort>
      </HotkeysProvider>
    </ConfigProvider>
  );
};

export default App;
