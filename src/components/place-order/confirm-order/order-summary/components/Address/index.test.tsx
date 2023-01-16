import { render, screen } from "@testing-library/react";
import Address from ".";
import { values } from "../../../../quote-order/Quote.test";

it("Can render component", async () => {
  await renderComponent();
});

export const renderComponent = async () => {
  render(<Address values={values} />);
  const component = await screen.findByTestId("order-summary-address");
  expect(component).toBeInTheDocument();
};
