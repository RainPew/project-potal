import { render, screen } from "@testing-library/react";
import { FormError } from "./FormError";

it("Can render component", async () => {
  await renderComponent();
});

it("Can display message", async () => {
  await renderComponent();
  const errorMessage = await screen.findByText("Test error message");
  expect(errorMessage).toBeInTheDocument();
});
const renderComponent = async () => {
  render(<FormError errorMessage="Test error message" />);
  const component = await screen.findByTestId("form-error");
  expect(component).toBeInTheDocument();
  return component;
};
