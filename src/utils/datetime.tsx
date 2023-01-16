import { format } from "date-fns";
export const formatDate = (date: any) => {
  if (!date) {
    return "";
  }
  const target = format(new Date(date), "MMMM dd, yyyy");
  return target;
};

export const formatTime = (date: any) => {
  if (!date) {
    return "";
  }

  const target = format(new Date(date), "h:m aaaaa'm'");
  return target.toUpperCase();
};

// format date with date-fns
