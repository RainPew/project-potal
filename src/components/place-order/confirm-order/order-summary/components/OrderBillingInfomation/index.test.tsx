import { render, screen } from "@testing-library/react";
import OrderBillingInfomation from ".";
import { values } from "../../../../quote-order/Quote.test";

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("order-billing-infomations");
  expect(component).toBeInTheDocument();
});

export const renderComponent = async () => {
  render(<OrderBillingInfomation values={values} />);
  const component = await screen.findByTestId("order-billing-infomations");
  expect(component).toBeInTheDocument();
};
