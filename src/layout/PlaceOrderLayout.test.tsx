import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import PlaceOrderContextProvider from "../components/place-order/PlaceOrderProvider";
import PlaceOrderLayOut from "./PlaceOrderLayout";
import { gql } from "@apollo/client";
import { act } from "react-dom/test-utils";
import { OrderReferences } from "../components/place-order/OrderReferences";
import userEvent from "@testing-library/user-event";
const SAVE_ORDER = gql`
  mutation saveOrders($input: QuoteOrderInput!) {
    saveOrders(input: $input) @rest(path: "/SaveOrder", method: "POST") {
      Status
    }
  }
`;

jest.mock("react-router-dom", () => {
  return {
    useLocation: () => {
      return {
        pathname: "/place-order",
      };
    },
    useHistory: () => ({
      push: jest.fn(),
      block: jest.fn(),
    }),
    Link: () => {
      return "";
    },
  };
});

const dataMock = {
  request: {
    query: SAVE_ORDER,
    variables: {
      input: {
        Order: {
          CustomerCode: "10017",
          Service: "Route",
          Auth: "10017",
          Pieces: {
            Piece: [
              {
                Sequence: "1",
                Reference: "test1234barcode",
                Pieces: "1",
              },
              {
                Sequence: "2",
                Reference: "test1235barcode",
                Pieces: "5",
              },
            ],
          },
          Stops: {
            Stop: [
              {
                Sequence: "1",
                StopType: "P",
                ScheduledDateTime: "11/13/2019 6:00:00 AM",
                Name: "James Madison",
                Address: "2251 Orange Blossom Trail",
                City: "Orlando",
                State: "FL",
                Zip: "32804",
                Country: "USA",
                Phone: "3015551212",
                ScheduledDateTimeTZ: "EST",
                OrderStopPieces: {
                  OrderStopPiece: {
                    PieceAction: "P",
                    Sequence: "1",
                  },
                },
              },
              {
                Sequence: "2",
                StopType: "D",
                ScheduledDateTime: "11/13/2019 5:00:00 PM",
                Name: "Bryan Moore",
                Address: "2253 Orange Blossom Trail",
                City: "Orlando",
                State: "FL",
                Zip: "32804",
                Country: "USA",
                Phone: "3015551212",
                ScheduledDateTimeTZ: "EST",
                OrderStopPieces: {
                  OrderStopPiece: {
                    PieceAction: "D",
                    Sequence: "1",
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  result: {
    data: { dog: { id: 1, name: "Buck", breed: "poodle" } },
  },
};

it("Can render component", async () => {
  renderComponent();
  const component = await screen.findByTestId("place-layout");
  expect(component).toBeInTheDocument();
});

it("Can switch to quote", async () => {
  renderComponent();
  const goToQuote = await screen.findByTestId("go-to-quote");
  expect(goToQuote).toBeInTheDocument();
  await act(async () => {
    await waitFor(() => fireEvent.click(goToQuote));
  });
});

it("Can place order", async () => {
  renderComponent();
  const place = await screen.findByTestId("place-order-act");
  expect(place).toBeInTheDocument();
  await act(async () => {
    await waitFor(() => fireEvent.click(place));
  });
});

it("Can show confirm discard", async () => {
  renderComponent();
  const input = await screen.findByTestId(`input-order-reference-0`);
  fireEvent.change(input, { target: { value: "reference" } });
  const backToDetail = await screen.findByTestId("back-to-detail");
  userEvent.click(backToDetail);
  const modal = await screen.findByTestId("confirm-discard");
  expect(modal).toBeInTheDocument();
  const cancel = await screen.findByTestId("confirm-discard-cancel");
  fireEvent.click(cancel);
  const ok = await screen.findByTestId("confirm-discard-ok");
  fireEvent.click(ok);
  fireEvent.change(input, { target: { value: "reference" } });
});

const renderComponent = () => {
  render(
    <MockedProvider mocks={[dataMock]} addTypename={false}>
      <DndProvider backend={TestBackend}>
        <PlaceOrderContextProvider>
          <PlaceOrderLayOut>
            <OrderReferences />
          </PlaceOrderLayOut>
        </PlaceOrderContextProvider>
      </DndProvider>
    </MockedProvider>
  );
};
