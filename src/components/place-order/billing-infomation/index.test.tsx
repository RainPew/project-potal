import ReactDOM from "react-dom";
import BillingInfomation from ".";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Billing } from "./index.type";
const mockData: Billing = {
  paymentOpitions: "test",
  email: "test",
  phoneNumber: "test",
};
const div = document.createElement("billing");
const mockReturnValue = jest.fn();
describe("billing-infomation", () => {
  it("should render props correctly", async () => {
    render(<BillingInfomation register={mockReturnValue} data={mockData} />);
    const btnEdit = await screen.findByTestId("btn-edit");
    user.click(btnEdit);
    const inputBilling = await screen.findByTestId("input-billing");
    const inputBillingEmail = await screen.findByTestId("input-billing-email");
    const inputBillingPayment = await screen.findByTestId(
      "input-billing-payment"
    );
    expect(inputBilling).toBeVisible();
    user.type(inputBilling, "inputBilling");
    user.type(inputBillingEmail, "inputBillingEmail");
    user.type(inputBillingPayment, "inputBillingPayment");
  });

  it("should render props uncorrectly", async () => {
    ReactDOM.render(<BillingInfomation register={mockReturnValue} />, div);
    render(<BillingInfomation register={mockReturnValue} data={mockData} />);
  });
});
