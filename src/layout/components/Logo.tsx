import styled from "@emotion/styled";
import { isEmpty } from "lodash";
import { useMemo } from "react";
import { useApp } from "../../ApplicationProvider";

const LogoContainer = () => {
  const appConfig = useApp().config;

  const logoUrl = useMemo(() => {
    return isEmpty(appConfig.Logo) ? "/images/Logo.svg" : appConfig.Logo;
  }, [appConfig.Logo]);

  return (
    <WrapperLogo>
      <img alt="logo" src={logoUrl} />
    </WrapperLogo>
  );
};

const WrapperLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 96px;
`;
export default LogoContainer;
