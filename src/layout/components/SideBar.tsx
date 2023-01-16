import { Menu } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { FunctionComponent, useMemo } from "react";
import { useApp } from "../../ApplicationProvider";
import { breakpointToggleSidebar } from "../../components/common/Constants";
import { routes } from "../../utils/router";
import MenuItem from "./MenuItem";

const SideBar: FunctionComponent = () => {
  const appConfig = useApp().config;

  const menus = useMemo(() => {
    const exclude = appConfig.Navbar?.Exclude || [];
    return routes.filter((item) => !exclude.includes(item.key));
  }, [appConfig.Navbar?.Exclude]);

  return (
    <Container>
      <Menu large style={{ background: "none" }}>
        <nav>
          {menus.map(({ icon, title, path }) => (
            <MenuItem icon={icon} text={title} path={path} key={path} />
          ))}
        </nav>
      </Menu>
    </Container>
  );
};

const Container = styled.div`
  min-height: 400px;
  width: 100%;
  li:hover {
    background: rgba(227, 6, 19, 0.05);
    border-radius: 6px;
    cursor: pointer;
  }
  @media only screen and (max-width: ${breakpointToggleSidebar}px) {
    height: calc(100vh - 180px);
  }
`;
export default SideBar;
