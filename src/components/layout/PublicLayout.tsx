import { Alignment, H5, Navbar } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { isEmpty } from "lodash";
import { FunctionComponent, useMemo } from "react";
import { Link } from "react-router-dom";
import { CenterType, Fill, Top } from "react-spaces";
import { useApp } from "../../ApplicationProvider";

const Container = styled(Fill)`
  width: 100%;
`;

const Content = styled(Fill)``;

const NavbarLogo = styled(Navbar.Group)`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NavLink = styled(Link)`
  z-index: 10;
  color: #406aff;
  font-weight: 400;
  font-size: 16px;

  :hover {
    color: #406aff;
  }
`;

const NavText = styled(H5)`
  z-index: 10;
  color: #406aff;
  font-size: 16px;
  margin-bottom: 0;

  :hover {
    color: #406aff;
  }
`;

const NavbarGroup = styled(Navbar.Group)`
  margin-right: 24px;
`;

const PublicLayout: FunctionComponent = ({ children }) => {
  const appConfig = useApp().config;

  const logoUrl = useMemo(() => {
    return isEmpty(appConfig.Logo) ? "/images/Logo.svg" : appConfig.Logo || "";
  }, [appConfig.Logo]);

  return (
    <Container>
      <Top size={52} centerContent={CenterType.Vertical}>
        <Navbar>
          <NavbarLogo align={Alignment.LEFT}>
            <Link className="bp4-minimal" to="">
              <img
                src={logoUrl}
                alt="logo"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = logoUrl;
                }}
              />
            </Link>
          </NavbarLogo>
          <NavbarGroup align={Alignment.RIGHT}>
            <NavLink className="bp4-minimal" to="">
              <NavText>Join an organization</NavText>
            </NavLink>
            <Navbar.Divider />
            <NavLink className="bp4-minimal" to="">
              <NavText>Create an account</NavText>
            </NavLink>
          </NavbarGroup>
        </Navbar>
      </Top>
      <Content>{children}</Content>
    </Container>
  );
};

export default PublicLayout;
