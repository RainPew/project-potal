import { render, screen } from "@testing-library/react";
import OrderQuote from ".";

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("order-qoute");
  expect(component).toBeInTheDocument();
});

export const renderComponent = async () => {
  render(<OrderQuote />);
  const component = await screen.findByTestId("order-qoute");
  expect(component).toBeInTheDocument();
};
