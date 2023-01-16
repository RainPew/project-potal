import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import { act } from "react-dom/test-utils";
import { ConfiguredToaster } from "../components/common/ConfiguredToaster";
import { toastError, toastSuccess } from "./toast";

test("can show toast of success", async () => {
  act(() => {
    render(
      <DndProvider backend={TestBackend}>
        <ConfiguredToaster />
      </DndProvider>
    );
  });

  act(() => {
    toastSuccess("Success Message");
  });

  const message = await screen.findByText(/Success Message/);
  expect(message).toBeInTheDocument();

  const closeButton = await screen.findByRole("button", { name: /close/i });
  userEvent.click(closeButton);
  await waitFor(
    () => {
      expect(screen.queryByText(/Success Message/i)).not.toBeInTheDocument();
    },
    { timeout: 10000 }
  );
}, 12000);

test("can show toast of error", async () => {
  act(() => {
    render(
      <DndProvider backend={TestBackend}>
        <ConfiguredToaster />
      </DndProvider>
    );
  });

  act(() => {
    toastError("Error Message");
  });

  const message = await screen.findByText(/Error Message/);
  expect(message).toBeInTheDocument();

  const closeButton = await screen.findByRole("button", { name: /close/i });
  userEvent.click(closeButton);
  await waitFor(
    () => {
      expect(screen.queryByText(/Error Message/i)).not.toBeInTheDocument();
    },
    { timeout: 10000 }
  );
}, 12000);
