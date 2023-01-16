import styled from "@emotion/styled";
import "../App.css";
import { useAuth } from "../components/AuthProvider";

const WhoAmIView = () => {
  const { user, groups, tenants, isAdmin, isSuperAdmin } = useAuth().state;

  const WhoAmIViewContainer = styled.div({
    display: "flex",
    padding: "20px",
  });

  const Column = styled.div({
    display: "flex",
    flexDirection: "column",
    flexBasis: "50%",
    flex: "1",
  });

  return (
    <WhoAmIViewContainer data-testid={"who-am-i-view"}>
      <Column>
        <h3>User Info</h3>
        <br />
        <div>
          <b>Name:</b> {user?.name}
        </div>
        <div>
          <b>Email:</b> {user?.email}
        </div>
        <div>
          <b>Subject:</b> {user?.sub}
        </div>
        <div>
          <b>Tenant ID:</b> {user?.tenantId}
        </div>
        <div>
          <b>Legacy User ID:</b> {user?.legacyUserId}
        </div>
        <div>
          <b>Groups:</b> {groups}
        </div>
        <div>
          <b>Allowed Tenants:</b> {isAdmin ? "All," : ""} {tenants}
        </div>
        <div>
          <b>Is Admin:</b> {isAdmin?.toString()}
        </div>
        <div>
          <b>Is Super Admin:</b> {isSuperAdmin?.toString()}
        </div>
      </Column>
      <Column>
        <h3>User JSON: </h3>
        <div style={{ overflow: "scroll", height: "600px" }}>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </Column>
    </WhoAmIViewContainer>
  );
};
export default WhoAmIView;
