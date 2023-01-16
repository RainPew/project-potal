import { render, screen } from "@testing-library/react";
import OrderNotifications from ".";

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("order-notificaiton");
  expect(component).toBeInTheDocument();
});

export const renderComponent = async () => {
  render(<OrderNotifications />);
  const component = await screen.findByTestId("order-notificaiton");
  expect(component).toBeInTheDocument();
};
