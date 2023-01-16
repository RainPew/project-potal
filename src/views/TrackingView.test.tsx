import { DndProvider } from "react-dnd";
import { TrackingView } from "./TrackingView";
import PlaceOrderContextProvider from "../components/place-order/PlaceOrderProvider";
import { MockedProvider } from "@apollo/client/testing";
import { TestBackend } from "react-dnd-test-backend";
import { apolloMock } from "../service/mockdata/apolloMock";
import { fireEvent, render, screen } from "@testing-library/react";


jest.mock("react-router-dom", () => ({
    useLocation: () => {
        return {
            pathname: "tracking",
        };
    },
    useHistory: () => ({
        push: jest.fn(),
    }),
    Link: () => {
        return "";
    },
}));

it("should render trackingview component", async () => {
    await renderComponent();
    const viewComponent = await screen.findByTestId("tracking-view");
    expect(viewComponent).toBeInTheDocument();
});

it("input search data table", async () => {
    await renderComponent();
    const datatable = await screen.findByTestId("input-search");
    expect(datatable).toBeInTheDocument();
    fireEvent.click(datatable); 
});

export const renderComponent = async () => {
    render(
        <DndProvider backend={TestBackend}>
            <PlaceOrderContextProvider>
                <MockedProvider mocks={apolloMock()} addTypename={false}>
                    <TrackingView />
                </MockedProvider>
            </PlaceOrderContextProvider>
        </DndProvider>
    );
    const component = await screen.findByTestId("tracking-view");
    expect(component).toBeInTheDocument();
    return component;
};