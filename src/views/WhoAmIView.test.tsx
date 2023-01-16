import { render, screen } from "@testing-library/react";
import WhoAmIView from "./WhoAmIView";

jest.mock("@okta/okta-react", () => ({
  useOktaAuth: () => {
    return {
      authState: {
        accessToken: {
          accessToken: "faketoken",
        },
      },
      oktaAuth: {
        getUser: () => {
          // This is blank because for this mock we just need this methods stubbed
        },
      },
    };
  },
}));

it("Can render component", async () => {
  render(<WhoAmIView key="testwhoamiview" />);

  const component = await screen.findByText(/User Info/);
  expect(component).toBeInTheDocument();
});
