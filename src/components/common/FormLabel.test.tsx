import { render, screen } from "@testing-library/react";
import { FormLabel } from "./FormLabel";

it("Can render component", async () => {
  await renderComponent();
});

it("Can display label", async () => {
  await renderComponent();
  const label = await screen.findByText("City");
  expect(label).toBeInTheDocument();
});
const renderComponent = async () => {
  render(<FormLabel label="City" htmlFor="city-input" />);
  const component = await screen.findByTestId("form-label");
  expect(component).toBeInTheDocument();
  return component;
};
