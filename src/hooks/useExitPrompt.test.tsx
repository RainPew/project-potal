import { render } from "@testing-library/react";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import PlaceOrderContextProvider from "../components/place-order/PlaceOrderProvider";
import useExitPrompt from "./useExitPrompt";

it("Can run hook", async () => {
  // window.onbeforeunload = jest.fn();
  renderComponent();
  window.dispatchEvent(new Event("beforeunload"));
});

const renderComponent = () => {
  render(
    <DndProvider backend={TestBackend}>
      <PlaceOrderContextProvider>
        <Component />
      </PlaceOrderContextProvider>
    </DndProvider>
  );
};

const Component = () => {
  const { setShowExitPrompt } = useExitPrompt(false);
  useEffect(() => {
    setShowExitPrompt(true);
  }, [setShowExitPrompt]);
  return <div></div>;
};
