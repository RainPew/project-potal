import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format } from "date-fns";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import { DeliveryDate } from "./DeliveryDate";
import PlaceOrderContextProvider from "./PlaceOrderProvider";
import * as myModule from "./useDeliveryDateSectionConfigs";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const choseFutureDate = async ({
  dateInput,
  testDate,
}: {
  dateInput: any;
  testDate: string;
}) => {
  await userEvent.click(dateInput);
  await userEvent.clear(dateInput);
  await userEvent.type(dateInput, testDate);
  await userEvent.tab();
};

jest.mock("react-router-dom", () => ({
  useLocation: () => {
    return {
      pathname: "/tracking",
    };
  },
  Link: () => {
    return "";
  },
}));

const renderComponent = () => {
  const component = render(
    <DndProvider backend={TestBackend}>
      <PlaceOrderContextProvider>
        <DeliveryDate />
      </PlaceOrderContextProvider>
    </DndProvider>
  );
  return component;
};

describe("test-order-ready-by-section", () => {
  let mockedFn: jest.SpyInstance<void>;
  beforeEach(() => {
    mockedFn = jest.spyOn(myModule, "useDeliveryDateSectionConfigs") as any;
  });

  afterEach(() => {
    mockedFn.mockRestore();
  });

  it("Can render title and 2 input fields", async () => {
    await act(async () => {
      renderComponent();
      expect(screen.getByText(/Order Ready By/)).toBeInTheDocument();
      expect(screen.getByText(/Ready by Date/)).toBeInTheDocument();
      expect(screen.getByText("Ready by Time")).toBeInTheDocument();
    });
  });

  it("Date picker can have the default value of current date", async () => {
    await act(async () => {
      renderComponent();
      function formatDate(date: Date) {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
      }

      const currentDateStr = formatDate(new Date());

      await sleep(1);
      expect(screen.getByLabelText(/Ready by Date/i)).toHaveAttribute(
        "value",
        currentDateStr
      );
    });
  });

  it("if ReadyTimeUnassign is false: Time picker can have the default value of current current", async () => {
    mockedFn.mockImplementation(() => {
      return {
        data: {
          ReadyTimeUnassign: false,
        },
        error: undefined,
        loading: false,
      };
    });
    await act(async () => {
      renderComponent();

      // const currentTimeStr = format(new Date(), "h:mm aaaaa'm'").toUpperCase();
      const currentTimeStr = format(new Date(), "HH:mm").toUpperCase();

      await sleep(500);
      expect(screen.getByLabelText("Ready by Time")).toHaveAttribute(
        "value",
        currentTimeStr
      );
    });
  });

  it("if ReadyTimeUnassign is true: Time picker can have the default value of empty", async () => {
    mockedFn.mockImplementation(() => {
      return {
        data: {
          ReadyTimeUnassign: true,
        },
        error: undefined,
        loading: false,
      };
    });
    await act(async () => {
      renderComponent();
      await sleep(500);
      expect(screen.getByLabelText("Ready by Time")).toHaveAttribute(
        "value",
        ""
      );
    });
  });

  it("Datepicker: Can chose a future date", async () => {
    await act(async () => {
      renderComponent();
      await sleep(500);
      const dateInput = await screen.getByLabelText("Ready by Date");
      const testDate = "2099-11-11";
      await choseFutureDate({ dateInput, testDate });
      expect(dateInput).toHaveValue(testDate);
    });
  });

  it("Timepicker: Can chose a future time", async () => {
    await act(async () => {
      renderComponent();
      await sleep(500);

      const dateInput = await screen.getByLabelText("Ready by Date");
      const testDate = "2099-11-11";
      await choseFutureDate({ dateInput, testDate });

      const testTime = "16:28";

      const timeInput = await screen.getByLabelText("Ready by Time");

      await userEvent.click(timeInput);

      await userEvent.clear(timeInput);

      await userEvent.type(timeInput, testTime);

      await userEvent.keyboard("{enter}");
      await userEvent.tab();

      // assert
      expect(timeInput).toHaveValue(testTime);
    });
  });

  it("Timepicker: Can not chose a past time", async () => {
    await act(async () => {
      renderComponent();
      await sleep(500);

      const testTime = "12:00 AM";

      const timeInput = await screen.getByLabelText("Ready by Time");

      await userEvent.click(timeInput);

      await userEvent.clear(timeInput);

      await userEvent.type(timeInput, testTime);
      await userEvent.keyboard("{enter}");
      await userEvent.tab();
      // assert
      await sleep(300);
      expect(timeInput).not.toHaveValue(testTime);
    });
  });
});
