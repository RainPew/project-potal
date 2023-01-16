import { Icon, MaybeElement, Text } from "@blueprintjs/core";
import { BlueprintIcons_16Id } from "@blueprintjs/icons/lib/esm/generated/16px/blueprint-icons-16";
import styled from "@emotion/styled";
import * as variable from "../../utils/variable";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../../ApplicationProvider";
import { memo, useMemo } from "react";

interface MenuItemProps {
  icon: BlueprintIcons_16Id | MaybeElement;
  text: string;
  path: string;
}
const MenuItem = ({ icon, text, path }: MenuItemProps) => {
  const location = useLocation();
  const appConfig = useApp().config;

  const variableApp = useMemo(() => {
    const ACTIVE_BG =
      appConfig.Navbar?.Style?.SecondaryColor || variable.ACTIVE_BG;
    const DEFAULT_BG =
      appConfig.Navbar?.Style?.Background || variable.DEFAULT_BG;
    const ACTIVE_COLOR =
      appConfig.Navbar?.Style?.PrimaryColor || variable.ACTIVE_COLOR;
    const DEFAULT_COLOR =
      appConfig.Navbar?.Style?.Color || variable.DEFAULT_COLOR;
    const ACTIVE_COLOR_ICON =
      appConfig.Navbar?.Style?.PrimaryColor || variable.ACTIVE_COLOR_ICON;
    const DEFAULT_COLOR_ICON =
      appConfig.Navbar?.Style?.IconColor || DEFAULT_COLOR;
    return {
      ACTIVE_BG,
      DEFAULT_BG,
      ACTIVE_COLOR_ICON,
      DEFAULT_COLOR_ICON,
      ACTIVE_COLOR,
      DEFAULT_COLOR,
    };
  }, [appConfig.Navbar?.Style]);

  const isActive = useMemo(
    () =>
      location.pathname === path ||
      (new RegExp(`^${path}`).test(location.pathname) && path !== "/"),
    [location.pathname, path]
  );

  return (
    <Link style={{ textDecoration: "none" }} to={path}>
      <Wrapper
        style={{
          background: isActive ? variableApp.ACTIVE_BG : variableApp.DEFAULT_BG,
        }}
      >
        <Icon
          icon={icon}
          iconSize={20}
          style={{
            color: isActive
              ? variableApp.ACTIVE_COLOR_ICON
              : variableApp.DEFAULT_COLOR_ICON,
          }}
        />
        <Text
          style={{
            color: isActive
              ? variableApp.ACTIVE_COLOR
              : variableApp.DEFAULT_COLOR,
          }}
        >
          {text}
        </Text>
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.li`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  gap: 10px;
  height: 40px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
`;

export default memo(MenuItem);
