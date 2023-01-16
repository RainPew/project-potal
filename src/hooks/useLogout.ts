import { useCallback } from "react";
import { Constants } from "../components/common/Constants";

export const useLogout = () => {
  const logout = useCallback(() => {
    localStorage.removeItem(Constants.LOCAL_STORAGE_KEYS.user);
    localStorage.removeItem(Constants.LOCAL_STORAGE_KEYS.UserGUID);
    window.location.reload();
  }, []);
  return logout;
};
