import { render, screen } from "@testing-library/react";
import { Section } from "./Section";

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("place-order-section");
  expect(component).toBeInTheDocument();
});

export const renderComponent = async () => {
  render(<Section title="Test" body={<div></div>} hasButtonCollapse />);
  const component = await screen.findByTestId("place-order-section");
  expect(component).toBeInTheDocument();
  return component;
};
