import React from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAuth } from "../../state";
import mutations from "../../api/mutations";

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
  ${({ error }) =>
    error &&
    `
      border: 1px solid red;
      color: red;
    `}
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

const ErrorMessage = styled.div`
  margin-bottom: 0.25rem;
  font-size: 12px;
  padding: 9px 0px 7px 8px;
  border-radius: 4px;
  outline: none;
  color: red;
`;

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username is too short!")
    .max(50, "Username is too long!")
    .required("Username is required field!"),
  password: Yup.string()
    .min(2, "Password is too short!")
    .max(50, "Password is too long!")
    .required("Password is required field!"),
});

function Login() {
  const history = useHistory();
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);

  async function onSubmit(values) {
    try {
      const response = await mutations.signin(values);
      const token = response.data.token;
      setIsLoggedIn(true, token);
      history.push("/");
    } catch (err) {
      if (err.response.data.exception === "UserNotFound") {
        formik.setErrors({ password: "Username or password is incorrect!" });
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: onSubmit,
  });
  return (
    <Wrapper>
      <Container>
        <Title>worldgram</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            placeholder="Username"
            onChange={formik.handleChange}
            value={formik.values.username}
            name="username"
            error={formik.errors.password && formik.touched.password}
          />
          {formik.errors.username ? (
            <ErrorMessage>{formik.errors.username}</ErrorMessage>
          ) : null}
          <Input
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            type="password"
            autoComplete="off"
            error={formik.errors.password && formik.touched.password}
          />
          {formik.errors.password ? (
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          ) : null}
          <Submit
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            style={{
              backgroundColor: !(formik.isValid && formik.dirty)
                ? "#B2DFFC"
                : null,
              color: !(formik.isValid && formik.dirty) ? "#fff" : null,
            }}
          >
            Log in
          </Submit>
        </Form>
      </Container>
      <SideContainer>
        <Label>
          Don't have an account?
          <StyledLink to="/signup"> Sign up </StyledLink>
        </Label>
      </SideContainer>
    </Wrapper>
  );
}
export default Login;
