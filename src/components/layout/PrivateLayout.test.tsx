import { render, screen } from "@testing-library/react";
import PrivateLayout from "./PrivateLayout";

it("Can render component", async () => {
  await renderComponent();
});

const renderComponent = async () => {
  render(
    <PrivateLayout>
      <div data-testid="private-layout"></div>
    </PrivateLayout>
  );
  const component = await screen.findByTestId("private-layout");
  expect(component).toBeInTheDocument();
  return component;
};
