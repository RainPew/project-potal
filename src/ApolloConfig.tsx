import { ApolloProvider } from "@apollo/client";
import { FunctionComponent } from "react";
import { useApolloClient } from "./graphql/useApolloClient";

const ApolloConfig: FunctionComponent = ({ children }) => {
  const client = useApolloClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloConfig;
