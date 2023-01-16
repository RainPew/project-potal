import { render, screen } from "@testing-library/react";
import OrderPackageDetails from ".";
import { values } from "../../../../quote-order/Quote.test";

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("order-package-details");
  expect(component).toBeInTheDocument();
});

export const renderComponent = async () => {
  render(<OrderPackageDetails values={values} />);
  const component = await screen.findByTestId("order-package-details");
  expect(component).toBeInTheDocument();
};
