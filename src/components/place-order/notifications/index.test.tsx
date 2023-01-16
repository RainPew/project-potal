import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Notification } from "./index.type";
import Notifications from ".";
const mockData: Notification = {
  email: "test",
  textMessage: "test",
  status: "test",
};
const div = document.createElement("notifications");
const mockReturnValue = jest.fn();
describe("test-notifications", () => {
  it("should render props correctly", async () => {
    render(<Notifications register={mockReturnValue} data={mockData} />);
    const btnEdit = await screen.findByTestId("btn-edit");
    user.click(btnEdit);
    const inputNotification = await screen.findByTestId("input-notification");
    const inputNotificationEmail = await screen.findByTestId(
      "input-notification-email"
    );
    expect(inputNotification).toBeVisible();
    user.type(inputNotification, "input");
    user.type(inputNotificationEmail, "input");
  });

  it("should render props uncorrectly", async () => {
    ReactDOM.render(<Notifications register={mockReturnValue} />, div);
    render(<Notifications register={mockReturnValue} data={mockData} />);
  });
});
