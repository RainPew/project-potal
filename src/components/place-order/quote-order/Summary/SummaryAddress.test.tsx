import { render, screen } from "@testing-library/react";
import { values } from "../Quote.test";
import SummaryAddress, { SummaryAddressItem } from "./SummaryAddress";

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("quote-order-summary-address");
  expect(component).toBeInTheDocument();
  const items = await screen.findAllByTestId(
    "quote-order-summary-address-item"
  );
  expect(items.length).toEqual(2);
});

it("Can render component item", async () => {
  render(<SummaryAddressItem item={values.stops[0]} lastItem />);
  const items = await screen.findAllByTestId(
    "quote-order-summary-address-item"
  );
  expect(items.length).toEqual(1);
});

export const renderComponent = async () => {
  render(<SummaryAddress values={values} />);
  const component = await screen.findByTestId("quote-order-summary-address");
  expect(component).toBeInTheDocument();
  return component;
};
