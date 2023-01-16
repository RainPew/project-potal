import { render, screen, waitFor } from "@testing-library/react";
import ApplicationProvider from "../ApplicationProvider";
import AuthProvider from "./AuthProvider";

it("Can render component", async () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await renderComponent();
});

export const renderComponent = async () => {
  localStorage.setItem("UserGUID", "{90EA88CD-035E-469F-82BA-CFF38C4D1027}");
  localStorage.setItem(
    "user",
    `{"name":"Evizi1","legacyUserId":"{AF480434-5FA3-4E49-8285-D62DBF4748EB}"}`
  );
  await waitFor(() => {
    return render(
      <ApplicationProvider>
        <AuthProvider>
          <div data-testid="auth-provider"></div>
        </AuthProvider>
      </ApplicationProvider>
    );
  });
  const component = await screen.findByTestId("auth-provider");
  expect(component).toBeInTheDocument();
  return component;
};
