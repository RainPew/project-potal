import { render, screen } from "@testing-library/react";
import { Select } from "./Select";

it("Can render component", async () => {
  await renderComponent();
});

it("Can display label", async () => {
  await renderComponent();
  const label = await screen.findByText("City");
  expect(label).toBeInTheDocument();
});

it("Can display value", async () => {
  await renderComponent({ options: null });
  const value = await screen.findByText("Houston");
  expect(value).toBeInTheDocument();
});

it("Can display message", async () => {
  await renderComponent({ noborder: true });
  const errorMessage = await screen.findByText("City is required");
  expect(errorMessage).toBeInTheDocument();
});

const renderComponent = async (props?: any) => {
  render(
    <Select
      label="City"
      name="city-input"
      error="City is required"
      value="Houston"
      onChange={() => {}}
      options={[{ value: "Houston", label: "Houston" }]}
      placeholder="Please select a city"
      dataTestid="select-input"
      {...props}
    />
  );
  const component = await screen.findByTestId("select");
  expect(component).toBeInTheDocument();
  return component;
};
