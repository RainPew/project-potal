import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PlaceOrderLayOut from "../../../layout/PlaceOrderLayout";
import PlaceOrderContextProvider from "../PlaceOrderProvider";
import StopSection from "./index";
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

describe("Test", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      value: () => {
        return {
          matches: false,
          addListener: () => {},
          removeListener: () => {},
        };
      },
    });
  });

  it("Can render component", async () => {
    await renderComponent();
    const component = await screen.findByTestId("place-order-stops-section");
    expect(component).toBeInTheDocument();
    const items = await screen.findAllByTestId("place-order-stops-item");
    expect(items.length).toEqual(2);
    const addStopBtn = await within(items[0]).findByTestId(
      "place-order-stops-item-add-stop"
    );
    expect(addStopBtn).toBeInTheDocument();
    fireEvent.click(addStopBtn);
    const items2 = await screen.findAllByTestId("place-order-stops-item");
    expect(items2.length).toEqual(3);
  });

  it("Can render component item view", async () => {
    await renderComponent();
    const prevItems = await screen.findAllByTestId("place-order-stops-item");
    expect(prevItems.length).toEqual(2);
    const switchToView = await within(prevItems[0]).findByTestId(
      "place-order-stops-item-edit-switch-to-view"
    );
    expect(switchToView).toBeInTheDocument();
    fireEvent.click(switchToView);
    const item = await screen.findByTestId("place-order-stops-item-view");
    const statusElement = await within(item).findByTestId(
      "place-order-stops-item-view-status"
    );
    expect(statusElement).toBeInTheDocument();
    const addressElement = await within(item).findByTestId(
      "place-order-stops-item-view-address"
    );
    expect(addressElement).toBeInTheDocument();
    const contactElement = await within(item).findByTestId(
      "place-order-stops-item-view-contact"
    );
    expect(contactElement).toBeInTheDocument();
  });

  it("Can render component item edit", async () => {
    await renderComponent();
    const items = await screen.findAllByTestId("place-order-stops-item");
    expect(items.length).toEqual(2);
    const statusElement = await within(items[0]).findByTestId(
      "place-order-stops-item-edit-status"
    );
    expect(statusElement).toBeInTheDocument();
    const searchAddressElement = await within(items[0]).findByTestId(
      "place-order-stops-item-edit-search-address"
    );
    expect(searchAddressElement).toBeInTheDocument();
    const nameElement = await within(items[0]).findByTestId(
      "place-order-stops-item-edit-name"
    );
    expect(nameElement).toBeInTheDocument();
    const addressElement = await within(items[0]).findByTestId(
      "place-order-stops-item-edit-address"
    );
    expect(addressElement).toBeInTheDocument();
    const buildingElement = await within(items[0]).findByTestId(
      "place-order-stops-item-edit-building"
    );
    expect(buildingElement).toBeInTheDocument();
    const stateElement = await within(items[0]).findByTestId(
      "place-order-stops-item-edit-state"
    );
    expect(stateElement).toBeInTheDocument();
    const zipElement = await within(items[0]).findByTestId(
      "place-order-stops-item-edit-zip"
    );
    expect(zipElement).toBeInTheDocument();
    const residenceElement = await within(items[0]).findByTestId(
      "place-order-stops-item-edit-residence"
    );
    expect(residenceElement).toBeInTheDocument();
    const notesElement = await within(items[0]).findByTestId(
      "place-order-stops-item-edit-notes"
    );
    expect(notesElement).toBeInTheDocument();
    const phoneElement = await within(items[0]).findByTestId(
      "place-order-stops-item-edit-phone"
    );
    expect(phoneElement).toBeInTheDocument();
    const emailElement = await within(items[0]).findByTestId(
      "place-order-stops-item-edit-email"
    );
    expect(emailElement).toBeInTheDocument();
    const saveAddressElement = await within(items[0]).findByTestId(
      "place-order-stops-item-edit-save-address"
    );
    expect(saveAddressElement).toBeInTheDocument();
    const clearForm = await within(items[0]).findByTestId(
      "place-order-stops-item-edit-clear-form"
    );
    expect(clearForm).toBeInTheDocument();
    fireEvent.click(clearForm);
    const goToQuote = await screen.findByTestId("go-to-quote");
    expect(goToQuote).toBeInTheDocument();
    fireEvent.click(goToQuote);
  });
});

export const renderComponent = async () => {
  render(
    <MockedProvider mocks={[dataMock]} addTypename={false}>
      <DndProvider backend={HTML5Backend}>
        <PlaceOrderContextProvider>
          <PlaceOrderLayOut>
            <StopSection />
          </PlaceOrderLayOut>
        </PlaceOrderContextProvider>
      </DndProvider>
    </MockedProvider>
  );
  const component = await screen.findByTestId("place-order-stops-section");
  expect(component).toBeInTheDocument();
  return component;
};
