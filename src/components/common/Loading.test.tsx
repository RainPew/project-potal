import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";

it("Can render component", async () => {
  await renderComponent();
});

const renderComponent = async () => {
  render(<Loading />);
  const component = await screen.findByTestId("loading");
  expect(component).toBeInTheDocument();
  return component;
};
