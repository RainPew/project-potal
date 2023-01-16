import { render, screen } from "@testing-library/react";
import { AntDatePickerWithDateFns } from "./AntDatePickerWithDateFns";

it("Can render component", async () => {
  await renderComponent();
});
const renderComponent = async (props?: any) => {
  const date = new Date("2016-11-22");
  render(
    <AntDatePickerWithDateFns
      data-testid="time-picker"
      onChange={() => {}}
      value={date}
      {...props}
    />
  );
  const component = await screen.findByTestId("time-picker");
  expect(component).toBeInTheDocument();
  return component;
};
