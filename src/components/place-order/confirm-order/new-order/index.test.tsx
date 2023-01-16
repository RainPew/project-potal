import { render, screen } from "@testing-library/react";
import NewOrder from ".";

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("new-order");
  expect(component).toBeInTheDocument();
});

export const renderComponent = async () => {
  render(<NewOrder />);
  const component = await screen.findByTestId("new-order");
  expect(component).toBeInTheDocument();
  return component;
};
