import React, { ErrorInfo } from "react";
import { Button, NonIdealState, TextArea } from "@blueprintjs/core";
import styled from "@emotion/styled";

const ErrorContainer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "0",
  margin: "0",
});

class ErrorBoundary extends React.Component<
  {},
  { error: any; errorInfo: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Stack: ${error.stack}`);
    console.error(`Stack: ${errorInfo.componentStack}`);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <ErrorContainer data-testid={"errorboundary"}>
          <NonIdealState
            icon="error"
            title={"Uh Oh... An Error Occurred"}
            description={this.state.error.toString()}
          >
            <Button
              icon="refresh"
              intent={"primary"}
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
            <details style={{ border: "2px", maxWidth: "100%" }}>
              <TextArea
                style={{ margin: "5px 0px", width: "800px" }}
                readOnly
                large
                rows={15}
                value={this.state.errorInfo.componentStack}
              />
            </details>
          </NonIdealState>
        </ErrorContainer>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
