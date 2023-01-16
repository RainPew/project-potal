import { InMemoryCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import PlaceOrderContextProvider from "../components/place-order/PlaceOrderProvider";
import { apolloMock } from "../service/mockdata/apolloMock";
import LoginView from "./LoginView";

jest.mock("react-router-dom", () => ({
  useLocation: () => {
    return {
      pathname: "/login",
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
  const component = await screen.findByTestId("login-view");
  expect(component).toBeInTheDocument();
});

it("Can input and login", async () => {
  await renderComponent();
  const login = await screen.findByTestId("input-login");
  expect(login).toBeInTheDocument();
  fireEvent.click(login);
  const username = await screen.findByTestId("text-input-username");
  const password = await screen.findByTestId("text-input-password");
  fireEvent.change(username, { target: { value: "test" } });
  fireEvent.change(password, { target: { value: "test" } });
  fireEvent.click(login);
});

it("Can input and login fail", async () => {
  await renderComponent();
  const login = await screen.findByTestId("input-login");
  expect(login).toBeInTheDocument();
  const username = await screen.findByTestId("text-input-username");
  const password = await screen.findByTestId("text-input-password");
  fireEvent.change(username, { target: { value: "test-fail" } });
  fireEvent.change(password, { target: { value: "test-fail" } });
  fireEvent.click(login);
});

it("Can show password", async () => {
  await renderComponent();
  const showPassword = await screen.findByTestId("toogle-show-password");
  expect(showPassword).toBeInTheDocument();
  fireEvent.click(showPassword);
});

export const renderComponent = async () => {
  render(
    <DndProvider backend={TestBackend}>
      <PlaceOrderContextProvider>
        <MockedProvider mocks={apolloMock()} cache={new InMemoryCache()}>
          <LoginView />
        </MockedProvider>
      </PlaceOrderContextProvider>
    </DndProvider>
  );
  const component = await screen.findByTestId("login-view");
  expect(component).toBeInTheDocument();
  return component;
};
