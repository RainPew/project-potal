import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import Hamburger from "hamburger-react";
import SideBar from "./SideBar";
import SettingContainer from "./SettingContainer";
import { Divider } from "@blueprintjs/core";
import CopyRight from "./CopyRight";
import { DEFAULT_BG, DEFAULT_COLOR } from "../../utils/variable";
import { useApp } from "../../ApplicationProvider";
import { isEmpty } from "lodash";

interface INavBarMobile {
  src?: string;
}

const NavBarMobile = (_props: INavBarMobile) => {
  const [isOpen, setOpen] = useState(false);

  const appConfig = useApp().config;

  const logoUrl = useMemo(() => {
    return isEmpty(appConfig.LogoMobile)
      ? "/images/logo-mobile.svg"
      : appConfig.LogoMobile || "";
  }, [appConfig.LogoMobile]);

  const background = useMemo(() => {
    const background = appConfig.Navbar?.Style?.Background || DEFAULT_BG;
    return background;
  }, [appConfig.Navbar?.Style?.Background]);

  const color = useMemo(() => {
    const colorText = appConfig.Navbar?.Style?.Color || DEFAULT_COLOR;
    const color = appConfig.Navbar?.Style?.IconColor || colorText;
    return color;
  }, [appConfig.Navbar?.Style]);

  return (
    <Container data-background={background}>
      <Wrapper>
        <Image
          src={logoUrl}
          alt="[avatar]"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = logoUrl;
          }}
        />

        <Hamburger
          toggled={isOpen}
          toggle={() => setOpen(!isOpen)}
          color={color}
        />
      </Wrapper>
      {isOpen && (
        <Menu className="fade-in" data-background={background}>
          <SideBar />
          <SettingContainer />
          <Divider />
          <CopyRight />
        </Menu>
      )}
    </Container>
  );
};
const Container = styled.div`
  box-shadow: 0px 2px 1px rgba(44, 58, 110, 0.06);
  background: ${(props: any) => props["data-background"]};
  position: relative;
  z-index: 9999;
`;
const Wrapper = styled.div`
  height: 56px;
  padding: 12px 16px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Menu = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 56px);
  background: red;
  text-align: center;
  background-color: ${(props: any) => props["data-background"]};
`;

const Image = styled.img`
  object-fit: contain;
`;
export default NavBarMobile;
