import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { useMemo } from "react";
import { env } from "../config";

const createApolloClient = (): any => {
  const UserGUID = localStorage.getItem("UserGUID");
  const restLink = new RestLink({
    uri: env.restApiUrl,
    headers: {
      UserGUID: UserGUID || "",
      // eslint-disable-next-line
      "Content-Type": "application/json",
    },
    // eslint-disable-next-line no-useless-escape
    fieldNameNormalizer: (fieldName) => fieldName.replaceAll(/[\:]/g, ""),
  });

  const client = new ApolloClient({
    //concat restLink and httpLink
    link: ApolloLink.from([restLink]),
    cache: new InMemoryCache({
      typePolicies: {},
    }),
  });
  return client;
};

export function useApolloClient() {
  const client = useMemo(() => {
    return createApolloClient();
  }, []);
  return client;
}
