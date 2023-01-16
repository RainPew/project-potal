import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import PlaceOrderLayOut from "../../layout/PlaceOrderLayout";
import { OrderReferences } from "./OrderReferences";
import PlaceOrderContextProvider from "./PlaceOrderProvider";
const SAVE_ORDER = gql`
  mutation saveOrders($input: QuoteOrderInput!) {
    saveOrders(input: $input) @rest(path: "/SaveOrder", method: "POST") {
      Status
    }
  }
`;
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

jest.mock("react-router-dom", () => ({
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
}));

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

it("Can render title section order references", async () => {
  renderComponent();
  expect(screen.getByText("Order References")).toBeInTheDocument();
});
it("Can render 4 inputs reference", async () => {
  renderComponent();
  const input = await screen.findByTestId(`input-order-reference-0`);
  const input2 = await screen.findByTestId(`input-order-reference-1`);
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: "reference" } });
  fireEvent.change(input2, { target: { value: "a" } });
  const goToQuote = await screen.findByTestId("go-to-quote");
  expect(goToQuote).toBeInTheDocument();
  fireEvent.click(goToQuote);
});
