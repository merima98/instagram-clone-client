import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  padding-top: 3rem;
  max-width: 350px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
`;

const Container = styled.div`
  border: 1px solid #dbdbdb;
  background-color: #ffffff;
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
  background-color: #fafafa;
  padding: 8px;
  border-radius: 4px;
  border: 0.5px solid #dbdbdb;
  outline: none;
`;

const Submit = styled.button`
  width: 80%;
  padding: 5px 9px;
  background-color: #0095f6;
  border-radius: 4px;
  margin-bottom: 1rem;
  border: none;
  color: #fff;
  outline: none;
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
          <StyledLink to="/signup"> Sign up</StyledLink>
        </Label>
      </SideContainer>
    </Wrapper>
  );
}
export default Login;
