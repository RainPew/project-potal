import { render, screen } from "@testing-library/react";
import Summary from "./Summary";
import { values } from "../Quote.test";
import PlaceOrderContextProvider from "../../PlaceOrderProvider";

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("quote-order-summary");
  expect(component).toBeInTheDocument();
});

export const renderComponent = async () => {
  render(
    <PlaceOrderContextProvider>
      <Summary values={values} />
    </PlaceOrderContextProvider>
  );
  const component = await screen.findByTestId("quote-order-summary");
  expect(component).toBeInTheDocument();
  return component;
};
