import { render, screen } from "@testing-library/react";
import PlaceOrderProvider from "./PlaceOrderProvider";

it("Can render component", async () => {
  await renderComponent();
});

const renderComponent = async () => {
  render(
    <PlaceOrderProvider>
      <div data-testid="place-order-provider"></div>
    </PlaceOrderProvider>
  );
  const component = await screen.findByTestId("place-order-provider");
  expect(component).toBeInTheDocument();
  return component;
};
