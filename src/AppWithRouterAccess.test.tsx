import { render } from "@testing-library/react";
import AppWithRouterAccess from "./AppWithRouterAccess";

it("Can render component", () => {
  renderComponent();
});

export const renderComponent = () => {
  render(<AppWithRouterAccess />);
};
