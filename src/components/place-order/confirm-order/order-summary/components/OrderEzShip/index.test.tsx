import { render, screen } from "@testing-library/react";
import OrderEzShip from ".";

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("order-ez-ship");
  expect(component).toBeInTheDocument();
});

export const renderComponent = async () => {
  render(<OrderEzShip />);
  const component = await screen.findByTestId("order-ez-ship");
  expect(component).toBeInTheDocument();
};
