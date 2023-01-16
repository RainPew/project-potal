import { render, screen } from "@testing-library/react";
import { TimePicker } from "./TimePicker";

describe("Time Picker", () => {
  it("Can render component", async () => {
    await renderComponent();
  });

  it("placeholder", async () => {
    await renderComponent();
    const placeholder = await (
      await screen.findByTestId("time-picker")
    ).getAttribute("placeholder");
    expect(placeholder).toEqual("Select time");
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
    <TimePicker
      error=""
      label=""
      name="time-picker"
      onChange={() => {}}
      value={date}
      {...props}
    />
  );
  const component = await screen.findByTestId("time-picker");
  expect(component).toBeInTheDocument();
  return component;
};
