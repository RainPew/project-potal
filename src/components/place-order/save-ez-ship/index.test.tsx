import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlaceOrderContextProvider from "../PlaceOrderProvider";
import SaveEzShip from "./index";

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("save-ez-ship");
  const checkbox = await screen.findByTestId("save-ez-ship-checkbox");
  expect(checkbox).toBeInTheDocument();
  expect(component).toBeInTheDocument();
  userEvent.click(checkbox);
  const input = await screen.findByTestId("SaveEZShipName");
  expect(input).toBeInTheDocument();
});

export const renderComponent = async () => {
  render(
    <PlaceOrderContextProvider>
      <SaveEzShip />
    </PlaceOrderContextProvider>
  );
  const component = await screen.findByTestId("save-ez-ship");
  expect(component).toBeInTheDocument();
  return component;
};
