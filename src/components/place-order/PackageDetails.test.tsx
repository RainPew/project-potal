import { MockedProvider } from "@apollo/client/testing";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import { apolloMock } from "../../service/mockdata/apolloMock";
import { PackageDetails } from "./PackageDetails";
import PlaceOrderContextProvider from "./PlaceOrderProvider";

jest.mock("react-router-dom", () => ({
  useLocation: () => {
    return {
      pathname: "/tracking",
    };
  },
  Link: () => {
    return "";
  },
}));

const renderComponent = () => {
  render(
    <DndProvider backend={TestBackend}>
      <PlaceOrderContextProvider>
        <MockedProvider mocks={apolloMock()} addTypename={false}>
          <PackageDetails />
        </MockedProvider>
      </PlaceOrderContextProvider>
    </DndProvider>
  );
};

it("Can render title section order references", async () => {
  await act(async () => {
    renderComponent();

    expect(screen.getByText("Package Details")).toBeInTheDocument();
  });
});
it("Can render inputs fields", async () => {
  await act(async () => {
    renderComponent();
    const cashondelivery = await screen.findByTestId(`switch-cashondelivery`);
    expect(cashondelivery).toBeInTheDocument();
    fireEvent.change(cashondelivery, { currentTarget: { checked: true } });
    const pieces = await screen.findByTestId(`input-pieces`);
    expect(pieces).toBeInTheDocument();
    fireEvent.change(pieces, { target: { value: 5 } });
    const weight = await screen.findByTestId(`input-weight`);
    expect(weight).toBeInTheDocument();
    fireEvent.change(weight, { target: { value: 5 } });
    const declaredvalue = await screen.findByTestId(`input-declaredvalue`);
    expect(declaredvalue).toBeInTheDocument();
    fireEvent.change(declaredvalue, { target: { value: 5 } });
    const description = await screen.findByTestId(`input-description`);
    expect(description).toBeInTheDocument();
    fireEvent.change(description, { target: { value: "Test description" } });
    const deliveryServiceType = await screen.findByTestId(
      `deliveryServiceType`
    );
    expect(deliveryServiceType).toBeInTheDocument();
    const packageType = await screen.findByTestId(`packageType`);
    expect(packageType).toBeInTheDocument();
    const vehicle = await screen.findByTestId(`packageType`);
    expect(vehicle).toBeInTheDocument();
    fireEvent.change(vehicle, { value: "Car" });
  });
});
