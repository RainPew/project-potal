import { Spinner } from "@blueprintjs/core";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useApp } from "../ApplicationProvider";
import { Constants } from "./common/Constants";

type AuthState = {
  UserGUID?: string;
  user?: any;
  token?: string;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  tenantId?: string;
  groups?: string[];
  tenants?: string[];
  isInitialLoading?: boolean;
};

const AuthContext = createContext<{
  setState: (state: AuthState) => void;
  state: AuthState;
}>({
  setState: (_state: AuthState) => {},
  state: {
    user: undefined,
    token: undefined,
    isAdmin: undefined,
    isSuperAdmin: undefined,
    tenantId: undefined,
    groups: undefined,
    tenants: undefined,
    isInitialLoading: true,
  },
});

const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: JSX.Element[] | JSX.Element;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useReducer(
    (prev: AuthState, state: AuthState) => ({
      ...prev,
      ...state,
    }),
    {
      UserGUID: undefined,
      user: undefined,
      token: undefined,
      isAdmin: undefined,
      tenantId: undefined,
      groups: undefined,
      tenants: undefined,
      isInitialLoading: true,
    }
  );

  const app = useApp();

  const getUserInfo = useCallback(
    () =>
      new Promise((rel, rej) => {
        const userLocalStorage =
          localStorage.getItem(Constants.LOCAL_STORAGE_KEYS.user) || "";
        const UserGUIDLocalStorage =
          localStorage.getItem(Constants.LOCAL_STORAGE_KEYS.UserGUID) || "";
        if (userLocalStorage && UserGUIDLocalStorage) {
          const user = JSON.parse(userLocalStorage);
          if (user && UserGUIDLocalStorage) {
            rel({
              user,
              UserGUID: UserGUIDLocalStorage,
            });
          } else rej(1);
        } else rej(1);
      }),
    []
  );

  useEffect(() => {
    if (localStorage.getItem("UserGUID")) {
      getUserInfo()
        .then(({ user, UserGUID }: any) => {
          setState({
            user,
            UserGUID,
            isInitialLoading: false,
          });
        })
        .catch(() => {
          setState({
            isInitialLoading: false,
          });
        });
    } else {
      setState({
        isInitialLoading: false,
      });
    }
  }, [getUserInfo]);

  return (
    <AuthContext.Provider value={{ state, setState }}>
      {state.isInitialLoading || app.loading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export type { AuthState };
export { AuthContext, useAuth };
