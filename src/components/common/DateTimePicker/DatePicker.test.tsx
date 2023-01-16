import { render, screen } from "@testing-library/react";
import { DatePicker } from "./DatePicker";

describe("Date Picker", () => {
  it("Can render component", async () => {
    await renderComponent();
  });

  it("placeholder", async () => {
    await renderComponent();
    const placeholder = await (
      await screen.findByTestId("date-picker")
    ).getAttribute("placeholder");
    expect(placeholder).toEqual("Select date");
  });

  it("disable", async () => {
    await renderComponent({ disable: true });
  });

  it("error", async () => {
    await renderComponent({ error: "Time without range" });
  });
});

const renderComponent = async (props?: any) => {
  const date = new Date("2016-11-22");
  render(
    <DatePicker
      error=""
      label=""
      name="date-picker"
      onChange={() => {}}
      value={date}
      {...props}
    />
  );
  const component = await screen.findByTestId("date-picker");
  expect(component).toBeInTheDocument();
  return component;
};
