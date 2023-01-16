import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import SITE_CONFIG from "./site_config.json";
import { env } from "./config";

interface IApplicationConfig {
  Logo?: string;
  LogoMobile?: string;
  Navbar?: {
    Exclude?: string[];
    Style?: {
      Background?: string;
      IconColor?: string;
      Color?: string;
      PrimaryColor?: string;
      SecondaryColor?: string;
    };
  };
}

export interface IApplicationContext {
  config: IApplicationConfig;
  loading: boolean;
}

const ApplicationContext = createContext<IApplicationContext>({
  config: {},
  loading: true,
});

export const useApp = () => useContext(ApplicationContext);

const ApplicationProvider: FunctionComponent = ({ children }) => {
  const [config, setConfig] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setConfig(SITE_CONFIG.find((site) => site.Id === env.siteId));
    setLoading(false);
  }, []);

  return (
    <ApplicationContext.Provider value={{ config, loading }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
