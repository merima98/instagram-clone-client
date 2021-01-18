import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Moon, Sun } from "react-feather";

import { useDarkMode } from "../../state";

const Wrapper = styled.div`
  align-items: center;
  padding-top: 3rem;
  justify-content: space-around;
  max-width: 350px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.colors.titleColor};
`;

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  background-color: ${(props) => props.theme.colors.backgroundColor};
  margin-bottom: 1rem;
`;

const Form = styled.form`
  padding: 12px;
  margin: 24px 0px 0px;
  text-align: center;
`;

const Input = styled.input`
  width: 80%;
  margin-bottom: 0.25rem;
  background-color: ${(props) => props.theme.colors.backgroundColorInput};
  font-size: 14px;
  padding: 9px 0px 7px 8px;
  border-radius: 4px;
  border: 0.5px solid ${(props) => props.theme.colors.colorInputBorder};
  outline: none;
  color: ${(props) => props.theme.colors.colorInput};
`;

const Submit = styled.button`
  width: 80%;
  padding: 5px 9px;
  background-color: ${(props) => props.theme.colors.backgroundColorSubmit};
  border-radius: 4px;
  margin-bottom: 1rem;
  border: none;
  color: ${(props) => props.theme.colors.color};
  outline: none;
`;

const SideContainer = styled.div`
  padding: 12px;
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  background-color: ${(props) =>
    props.theme.colors.sideBarContainerBackgroundColor};
`;
const Label = styled.span`
  margin: 0 auto;
  color: ${(props) => props.theme.colors.titleColor};
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.styledLinkColor};
`;
function Login() {
  const setIsDarkMode = useDarkMode((state) => state.setIsDarkMode);
  const isDarkMode = useDarkMode((state) => state.isDarkMode);

  function onChange() {
    setIsDarkMode(!isDarkMode);
  }
  return (
    <Wrapper>
      <Container>
        <Title>worldgram</Title>
        <Form>
          <Input placeholder="Phone, number, username or email" />
          <Input placeholder="Password" />
          <Submit type="submit">Log in</Submit>
        </Form>
      </Container>
      <SideContainer>
        <Label>
          Don't have an account?
          <StyledLink to="/signup"> Sign up </StyledLink>
          {isDarkMode ? (
            <Sun
              style={{
                cursor: "pointer",
                color: "#8B8D90",
                height: "14px",
                width: "14px",
              }}
              onClick={onChange}
            />
          ) : (
            <Moon
              style={{
                cursor: "pointer",
                color: "#8B8D90",
                height: "14px",
                width: "14px",
              }}
              onClick={onChange}
            />
          )}
        </Label>
      </SideContainer>
    </Wrapper>
  );
}
export default Login;
