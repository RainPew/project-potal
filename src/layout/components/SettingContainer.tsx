import { Icon, Menu, MenuItem } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import styled from "@emotion/styled";
import { useMemo } from "react";
import { useApp } from "../../ApplicationProvider";
import { breakpointToggleSidebar } from "../../components/common/Constants";
import { useLogout } from "../../hooks/useLogout";
import { DEFAULT_COLOR } from "../../utils/variable";

interface ISettingContainer {
  data?: TInfo;
}
type TInfo = {
  name: string;
  logo: string;
  nameCompany: string;
};

const SettingContainer = ({ data }: ISettingContainer) => {
  const DEFAULT_IMAGE = "/images/avatar.svg";
  const logout = useLogout();

  const appConfig = useApp().config;

  const color = useMemo(() => {
    const color = appConfig.Navbar?.Style?.Color || DEFAULT_COLOR;
    return color;
  }, [appConfig.Navbar?.Style]);

  const settingColor = useMemo(() => {
    const colorText = appConfig.Navbar?.Style?.Color || DEFAULT_COLOR;
    const color = appConfig.Navbar?.Style?.IconColor || colorText;
    return color;
  }, [appConfig.Navbar?.Style]);

  return (
    <Wrapper>
      <Container data-setting-color={settingColor}>
        <Wrapper>
          <Image
            src={data?.logo || DEFAULT_IMAGE}
            alt="[avatar]"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = DEFAULT_IMAGE;
            }}
          />
          <WrapperInfo>
            <LabelName data-color={color}>{data?.name}</LabelName>
            <LabelCompany data-color={color}>{data?.logo}</LabelCompany>
          </WrapperInfo>
        </Wrapper>

        <Popover2
          enforceFocus={false}
          isOpen={undefined}
          content={
            <Menu key="menu">
              <MenuItem
                onClick={logout}
                icon="log-out"
                text="Log out"
                label=""
              />
            </Menu>
          }
        >
          <IconWrapper icon="cog" color={settingColor} />
        </Popover2>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  padding: 0 16px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  padding: 10px 16px 10px 0px;
  @media only screen and (max-width: ${breakpointToggleSidebar}px) {
    box-shadow: 0px 2px 1px rgba(44, 58, 110, 0.04);
    border-radius: 6px;
    border: 1px solid ${(props: any) => props["data-setting-color"]};
  }
`;
const IconWrapper = styled(Icon)`
  cursor: pointer;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6;
`;
const WrapperInfo = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const LabelName = styled.p`
  margin: 0;
  padding: 0;
  color: ${(props: any) => props["data-color"]};
  font-size: 15px;
  line-height: 18px;
`;

const LabelCompany = styled.p`
  margin: 0;
  padding: 0;
  color: ${(props: any) => props["data-color"]};
  font-size: 15px;
  line-height: 18px;
  opacity: 0.8;
`;

export default SettingContainer;
