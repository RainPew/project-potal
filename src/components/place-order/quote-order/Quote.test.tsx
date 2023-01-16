import { InMemoryCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { apolloMock } from "../../../service/mockdata/apolloMock";
import QuoteOrderOutput from "../../../services/mockdata/QuoteOrderOutput.json";
import PlaceOrderContextProvider from "../PlaceOrderProvider";
import Quote, { QuoteResponsiveItem } from "./Quote";

jest.mock("react-router-dom", () => ({
  useLocation: () => {
    return {
      pathname: "/place-order/quote",
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
  await renderTrackingInfor(values);
  const component = await screen.findByTestId("quote-order");
  expect(component).toBeInTheDocument();
});

it("Can render component item", async () => {
  render(
    <QuoteResponsiveItem
      item={QuoteOrderOutput.mQuoteOrderResponse.Order[0]}
      onSelect={() => {}}
    />
  );
  const component = await screen.findByTestId("quote-order-service-item");
  expect(component).toBeInTheDocument();
});

export const renderTrackingInfor = async (values?: any) => {
  await waitFor(() => {
    return render(
      <PlaceOrderContextProvider>
        <MockedProvider mocks={apolloMock()} cache={new InMemoryCache()}>
          <Quote values={values} />
        </MockedProvider>
      </PlaceOrderContextProvider>
    );
  });
  const component = await screen.findByTestId("quote-order");
  expect(component).toBeInTheDocument();
  return component;
};

export const values = {
  delivery_date: new Date("11/13/2019"),
  delivery_time: new Date("11/13/2019 6:00:00 AM"),
  deliveryServiceType: "Route",
  forward: true,
  stops: [
    {
      StopType: "P",
      Name: "James Madison",
      Address: "2251 Orange Blossom Trail",
      City: "Orlando",
      State: "FL",
      Zip: "32804",
      Country: "USA",
      Phone: "3015551212",
    },
    {
      StopType: "D",
      Name: "Bryan Moore",
      Address: "2253 Orange Blossom Trail",
      City: "Orlando",
      State: "FL",
      Zip: "32804",
      Country: "USA",
      Phone: "3015551212",
    },
  ],
};
