import { render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import ApplicationProvider from "../ApplicationProvider";
import MainLayout from "./MainLayout";

jest.mock("react-router-dom", () => ({
  useLocation: () => {
    return {
      pathname: "/",
    };
  },
  useHistory: () => ({
    push: jest.fn(),
  }),
  Link: () => {
    return "";
  },
}));

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("main-layout");
  expect(component).toBeInTheDocument();
});

export const renderComponent = async () => {
  render(
    <DndProvider backend={TestBackend}>
      <ApplicationProvider>
        <MainLayout />
      </ApplicationProvider>
    </DndProvider>
  );
  const component = await screen.findByTestId("main-layout");
  expect(component).toBeInTheDocument();
  return component;
};
