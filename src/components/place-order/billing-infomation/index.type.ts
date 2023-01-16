import { UseFormRegister } from "react-hook-form";

export type Billing = {
  paymentOpitions: string;
  email: string;
  phoneNumber: string;
};
export interface IBillingInfomation {
  data?: Billing;
  register: UseFormRegister<Billing>;
}
