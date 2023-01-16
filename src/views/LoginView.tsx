import {
  FunctionComponent,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Fill } from "react-spaces";
import styled from "@emotion/styled";
import {
  Button,
  Card,
  Checkbox,
  Elevation,
  FormGroup,
  H2,
  H5,
  InputGroup,
} from "@blueprintjs/core";
import { useLoginMutation } from "../generated/graphql";
import { Link, useHistory } from "react-router-dom";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useAuth } from "../components/AuthProvider";
import { AppToaster } from "../utils/toaster";
import { Constants } from "../components/common/Constants";
import { WEBSITE } from "../config";

const Container = styled(Fill)`
  padding-left: 10px;
  background-color: #f4f5f7;
`;

const CardForm = styled(Card)`
  width: 30%;
  margin: 40px auto;
  background-color: white;
  border-radius: 4px;
  padding: 40px;
`;

const CardHeader = styled.div`
  text-align: center;
  p {
    font-size: 16px;
  }
`;

const Form = styled.form`
  font-size: 16px;
  padding-top: 20px;
  .bp4-form-group label.bp4-label {
    margin-bottom: 8px;
  }
`;

const LoginFormInfomationSection = styled.div`
  display: flex;
  justify-content: space-between;

  label {
    display: flex;
    align-items: center;
  }
`;

const SubmitInput = styled.div`
  display: flex;
  justify-content: end;
  padding-top: 20px;

  .bp4-button {
    padding: 8px 24px;
  }
`;

const NavLink = styled(Link)`
  color: #406aff;
  :hover {
    color: #406aff;
  }
`;

const NavText = styled(H5)`
  color: #406aff;
  font-size: 16px;
  margin-bottom: 0;
  display: initial;

  :hover {
    color: #406aff;
  }
`;

const LoginView: FunctionComponent = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [login, { loading }] = useLoginMutation();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setState } = useAuth();
  const history = useHistory();

  const loginForm = useCallback(
    (e: any) => {
      e.preventDefault();
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
      if (!username || !password) return;
      const navigateLoginSuccess = (loginRespone: any) => {
        localStorage.setItem("UserGUID", loginRespone.UserGUID);
        const user = {
          name: username,
          legacyUserId: loginRespone.UserGUID,
        };
        setState({
          user,
          token: loginRespone.UserGUID,
          UserGUID: loginRespone.UserGUID,
        });
        localStorage.setItem("user", JSON.stringify(user));
        history.push(Constants.DEFAULT_ROUTE);
      };
      login({
        variables: {
          input: {
            username,
            password,
            website: WEBSITE,
            loginmode: "webremote",
          },
        },
      })
        .then((res) => {
          const loginRespone = res.data?.login;
          if (loginRespone?.status === "0" && loginRespone.UserGUID) {
            navigateLoginSuccess(loginRespone);
          }
        })
        .catch((err) => {
          AppToaster.show({
            message: err.message,
          });
        });
    },
    [history, login, setState]
  );

  const toggleShowPassword = useCallback(() => {
    setShowPassword((showPassword: boolean) => !showPassword);
  }, [setShowPassword]);

  const lockButton = useMemo(
    () => (
      <Tooltip2
        content={`${showPassword ? "Hide" : "Show"} Password`}
        disabled={loading}
      >
        <Button
          disabled={loading}
          icon={showPassword ? "eye-off" : "eye-open"}
          minimal={true}
          onClick={toggleShowPassword}
          data-testid="toogle-show-password"
        />
      </Tooltip2>
    ),
    [showPassword, loading, toggleShowPassword]
  );

  return (
    <Container>
      <CardForm elevation={Elevation.TWO}>
        <CardHeader>
          <H2>Log in</H2>
          <div data-testid="login-view">
            <p style={{ display: "inline" }}>Don't have an account?</p>{" "}
            <NavLink to="">
              <NavText>Continue as guest</NavText>
            </NavLink>
          </div>
        </CardHeader>
        <Form onSubmit={loginForm}>
          <FormGroup label="User Name" labelFor="text-input-username">
            <InputGroup
              id="text-input-username"
              required
              inputRef={usernameRef}
              placeholder="e.g john@example.com"
              readOnly={loading}
              data-testid="text-input-username"
            />
          </FormGroup>
          <FormGroup label="Password" labelFor="text-input-password">
            <InputGroup
              id="text-input-password"
              type={showPassword ? "text" : "password"}
              rightElement={lockButton}
              required
              inputRef={passwordRef}
              placeholder="Type your password"
              readOnly={loading}
              data-testid="text-input-password"
            />
          </FormGroup>
          <LoginFormInfomationSection>
            <Checkbox label="Remember me" />
            <NavText>
              <NavLink to="/">Forgot your password?</NavLink>
            </NavText>
          </LoginFormInfomationSection>
          <SubmitInput>
            <Button
              type="submit"
              className="bp4-intent-primary bp4-large"
              loading={loading}
              data-testid="input-login"
            >
              Log in
            </Button>
          </SubmitInput>
        </Form>
      </CardForm>
    </Container>
  );
};

export default memo(LoginView);
