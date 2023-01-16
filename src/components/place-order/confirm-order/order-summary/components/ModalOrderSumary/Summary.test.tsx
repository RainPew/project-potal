import { render, screen } from "@testing-library/react";
import { values } from "../../../../quote-order/Quote.test";
import user from "@testing-library/user-event";
import Summary from "./Summary";

it("Can render component", async () => {
  await renderComponent();
  const toogleOpenModal = await screen.findAllByTestId("toogle-open-modal");
  user.click(toogleOpenModal[0]);
});

export const renderComponent = async () => {
  render(<Summary values={values} />);
  const component = await screen.findByTestId("quote-order-summary");
  expect(component).toBeInTheDocument();
};
