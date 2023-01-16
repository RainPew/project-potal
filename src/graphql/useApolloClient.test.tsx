import { render } from "@testing-library/react";
import { useApolloClient } from "./useApolloClient";

it("Can render hook", () => {
  render(<Component />);
});

const Component = () => {
  useApolloClient();
  return <div></div>;
};
