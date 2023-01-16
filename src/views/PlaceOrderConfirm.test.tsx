import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import PlaceOrderContextProvider from "../components/place-order/PlaceOrderProvider";
import { apolloMock } from "../service/mockdata/apolloMock";
import PlaceOrderConfirm from "./PlaceOrderConfirm";

jest.mock("react-router-dom", () => ({
  useLocation: () => {
    return {
      pathname: "/place-order/confirm/6789",
    };
  },
  useHistory: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({
    orderId: "6789",
  }),
  Link: () => {
    return "";
  },
}));

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("place-order-confirm-view");
  expect(component).toBeInTheDocument();
});

it("Can open modal", async () => {
  await renderComponent();
  const btnOpenModal = await screen.findByTestId("open-modal");
  expect(btnOpenModal).toBeInTheDocument();
  fireEvent.click(btnOpenModal);
});

export const renderComponent = async () => {
  render(
    <DndProvider backend={TestBackend}>
      <PlaceOrderContextProvider>
        <MockedProvider mocks={apolloMock()} addTypename={false}>
          <PlaceOrderConfirm />
        </MockedProvider>
      </PlaceOrderContextProvider>
    </DndProvider>
  );
  const component = await screen.findByTestId("place-order-confirm-view");
  expect(component).toBeInTheDocument();
  return component;
};
