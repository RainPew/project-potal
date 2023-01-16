import { render, screen } from "@testing-library/react";
import PlaceOrderPrint from ".";

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("placeOrder-print");
  expect(component).toBeInTheDocument();
});

export const renderComponent = async () => {
  render(<PlaceOrderPrint />);
  const component = await screen.findByTestId("placeOrder-print");
  expect(component).toBeInTheDocument();
  return component;
};
