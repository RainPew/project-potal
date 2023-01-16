import { UseFormRegister } from "react-hook-form";

export interface INotifications {
  data?: Notification;
  register: UseFormRegister<Notification>;
}

export type Notification = {
  email: string;
  status: string;
  textMessage: string;
};
