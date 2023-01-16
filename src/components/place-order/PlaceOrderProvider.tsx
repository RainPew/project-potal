import { createContext, useCallback, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

export type IFormPlaceOrder = {
  delivery_date: Date | null;
  delivery_time: Date | null;
  cashondelivery: boolean;
  references: any[];
  quoteService: any;
  stops: {
    StopType?: any;
    Address?: string;
    Building?: string;
    City?: string;
    Email?: string;
    Name?: string;
    Notes?: string;
    Phone?: string;
    SaveAddress?: boolean;
    State?: string;
    Zip?: string;
    edit?: any;
    Residence?: boolean;
    disableRemove?: any;
  }[];
  [key: string]: any;
};

interface PlaceOrderContextType {
  formState: UseFormReturn<IFormPlaceOrder, any>;
}

const PlaceOrderContext = createContext<PlaceOrderContextType>({} as any);

export const usePlaceOrder = () => {
  const state = useContext(PlaceOrderContext);

  const validate = useCallback(async () => {
    const err = await state.formState.trigger();
    return err as any;
  }, [state.formState]);

  return {
    ...state,
    validate,
  };
};

const PlaceOrderContextProvider = ({ children }: any) => {
  const formState = useForm<IFormPlaceOrder>({
    defaultValues: {
      delivery_date: new Date(),
      delivery_time: new Date(),
      cashondelivery: false,
      references: [{ reference: "" }, { reference: "" }],
      stops: [
        {
          StopType: "P",
          edit: true,
          disableRemove: true,
        },
        {
          StopType: "D",
          edit: true,
          disableRemove: true,
        },
      ],
    } as any,
  });

  return (
    <PlaceOrderContext.Provider
      value={{
        formState,
      }}
    >
      {children}
    </PlaceOrderContext.Provider>
  );
};

export default PlaceOrderContextProvider;
