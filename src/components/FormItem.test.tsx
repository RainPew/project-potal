import { render, screen } from "@testing-library/react";
import FormItem from "./FormItem";

it("Can render component", async () => {
  await renderComponent();
});

it("Can display label", async () => {
  await renderComponent();
  const label = await screen.findByText("City");
  expect(label).toBeInTheDocument();
});

it("Can display error message", async () => {
  await renderComponent();
  const errorMessage = await screen.findByText("City not found");
  expect(errorMessage).toBeInTheDocument();
});

const renderComponent = async () => {
  render(
    <FormItem label="City" error={{ message: "City not found" }}>
      <div data-testid="form-item"></div>
    </FormItem>
  );
  const component = await screen.findByTestId("form-item");
  expect(component).toBeInTheDocument();
  return component;
};
