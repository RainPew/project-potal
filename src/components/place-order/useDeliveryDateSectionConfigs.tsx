import { useMemo } from "react";

export const useDeliveryDateSectionConfigs = () => {
  const configs = useMemo(() => {
    return {
      data: {
        ReadyTimeUnassign: false,
      },
      error: undefined,
      loading: false,
    };
  }, []);
  return configs;
};
