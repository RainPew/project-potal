import { render, screen } from "@testing-library/react";
import { shouldHandleEvent } from "./DndKitExtensions";

it("Does handle event for Element", async () => {
  render(<div data-testid={"div"} />);
  let component = await screen.findByTestId("div");
  expect(shouldHandleEvent(component)).toBeTruthy();
});

it("Does not handle event for noDnd Element", async () => {
  render(<div data-testid={"div"} data-no-dnd="true" />);
  let component = await screen.findByTestId("div");
  expect(shouldHandleEvent(component)).toBeFalsy();
});
