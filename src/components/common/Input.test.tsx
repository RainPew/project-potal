import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

it("Can render component", async () => {
  await renderComponent();
});

it("Can display label", async () => {
  await renderComponent();
  const label = await screen.findByText("City");
  expect(label).toBeInTheDocument();
});

it("Can display value", async () => {
  await renderComponent();
  const input = await screen.findByTestId("city-input");
  const value = input.getAttribute("value");
  expect(value).toEqual("Houston");
});

it("Can display message", async () => {
  await renderComponent();
  const errorMessage = await screen.findByText("City is required");
  expect(errorMessage).toBeInTheDocument();
});

const renderComponent = async () => {
  render(
    <Input
      label="City"
      name="city-input"
      error="City is required"
      value="Houston"
    />
  );
  const component = await screen.findByTestId("input");
  expect(component).toBeInTheDocument();
  return component;
};
