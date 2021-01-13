import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  align-items: center;
  padding-top: 3rem;
  display: grid;
  grid-template-rows: repeat(2, 0.5fr);
  justify-content: space-around;
`;

const Title = styled.h1`
  text-align: center;
`;

const Container = styled.div`
  border: 1px solid #dbdbdb;
  background-color: #ffffff;
`;

const Form = styled.form`
  padding: 12px;
  margin: 24px 0px 0px;
  text-align: center;
`;

const Input = styled.input`
  width: 80%;
  margin-bottom: 0.25rem;
  background-color: #fafafa;
  font-size: 14px;
  padding: 9px 0px 7px 8px;
  border-radius: 4px;
  border: 0.5px solid #dbdbdb;
`;

const Submit = styled.button`
  width: 80%;
  padding: 5px 9px;
  background-color: #0095f6;
  border-radius: 4px;
  margin-bottom: 1rem;
  border: none;
  color: #fff;
`;

const SideContainer = styled.div`
  padding: 12px;
  text-align: center;
  border: 1px solid #dbdbdb;
  background-color: #ffffff;
`;
const Label = styled.span`
  margin: 0 auto;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #0095f6;
`;

function Login() {
  return (
    <Wrapper>
      <Container>
        <Title>supergram</Title>
        <Form>
          <Input />
          <Input />
          <Submit type="submit">Log in</Submit>
        </Form>
      </Container>
      <SideContainer>
        <Label>
          Don't have an account?
          <StyledLink to="/signup"> Sign up</StyledLink>
        </Label>
      </SideContainer>
    </Wrapper>
  );
}
export default Login;
