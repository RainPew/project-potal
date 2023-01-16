// import styled from "@emotion/styled";
import { FunctionComponent, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { Fill } from "react-spaces";
import { useAuth } from "../AuthProvider";

// const Container = styled(Fill)`
//   width: 100%;
//   overflow: hidden;
// `;

const PrivateLayout: FunctionComponent = ({ children }) => {
  const { state } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!state?.isInitialLoading && !state?.user) {
      // Go to login page if unauthenticated
      history.replace("/login");
    }
  }, [state, history]);

  return children as any;
  // return <Container>{children}</Container>; // TODO: Fix this
};

export default PrivateLayout;
