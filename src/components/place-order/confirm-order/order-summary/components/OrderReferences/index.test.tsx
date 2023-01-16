import { render, screen } from "@testing-library/react";
import OrderReferences from ".";

const mockData = [
  {
    "@CustomerReferenceID": "35",
    "@Source": "OrderMain.Auth",
    "@UsageID": "-1",
    "@Name": "Auth_Reference",
    "@Label": "Auth_Reference",
    "@Prompt": "",
    "@Format": "",
    "@DefaultValue": "",
    "@VisualSequence": "100",
    "@MaxLength": "",
  },
  {
    "@CustomerReferenceID": "36",
    "@Source": "OrderMain.OrderNumber",
    "@UsageID": "0",
    "@Name": "OrderNumber_Reference",
    "@Label": "OrderNumber_Reference",
    "@Prompt": "",
    "@Format": "",
    "@DefaultValue": "",
    "@VisualSequence": "100",
    "@MaxLength": "",
  },
  {
    "@CustomerReferenceID": "37",
    "@Source": "OrderReference.Value",
    "@UsageID": "-1",
    "@Name": "OrderReference",
    "@Label": "OrderReference",
    "@Prompt": "",
    "@Format": "",
    "@DefaultValue": "",
    "@VisualSequence": "100",
    "@MaxLength": "",
  },
];

it("Can render component", async () => {
  await renderComponent();
  const component = await screen.findByTestId("order-reference");
  expect(component).toBeInTheDocument();
});

export const renderComponent = async () => {
  render(<OrderReferences value={mockData} />);
  const component = await screen.findByTestId("order-reference");
  expect(component).toBeInTheDocument();
};
