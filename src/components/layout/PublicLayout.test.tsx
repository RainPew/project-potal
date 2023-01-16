import { render, screen } from "@testing-library/react";
import PublicLayout from "./PublicLayout";

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
  await renderComponent();
});

const renderComponent = async () => {
  render(
    <PublicLayout>
      <div data-testid="public-layout"></div>
    </PublicLayout>
  );
  const component = await screen.findByTestId("public-layout");
  expect(component).toBeInTheDocument();
  return component;
};
