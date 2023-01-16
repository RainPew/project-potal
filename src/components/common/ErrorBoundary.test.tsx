import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";
import "@testing-library/jest-dom";

describe("Error Boundary", () => {
  it("Catches Error", async () => {
    const ThrowError = () => {
      throw new Error("Test");
    };
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByTestId("errorboundary")).toBeVisible();
  });
});
