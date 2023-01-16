import { render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PlaceOrderContextProvider from "../../PlaceOrderProvider";
import { StopItemEdit } from "./StopItemDetail";

it("Can render component", async () => {
  await renderComponent();
});

const renderComponent = async () => {
  render(
    <DndProvider backend={HTML5Backend}>
      <PlaceOrderContextProvider>
        <StopItemEdit
          field={{}}
          id="341#q"
          index={0}
          onAddStop={() => {}}
          onRemoveStop={() => {}}
          onResetStop={() => {}}
          onToogleEdit={() => {}}
          dragElement={null}
        />
      </PlaceOrderContextProvider>
    </DndProvider>
  );
  const component = await screen.findByTestId("place-order-stops-item-edit");
  expect(component).toBeInTheDocument();
  return component;
};
