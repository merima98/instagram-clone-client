import React from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Sun, Moon } from "react-feather";

import { useDarkMode, useAuth } from "../../state";
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
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.styledLinkColor};
`;
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name is too short!")
    .max(50, "First name is too long!")
    .required("First name is required field"),
  lastName: Yup.string()
    .min(2, "Last name is too short!")
    .max(50, "Last name is too long!")
    .required("Last name is required field"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Email is required field"),
  username: Yup.string()
    .min(2, "Username is too short!")
    .max(50, "Username is too long!")
    .required("Username is required field"),
  password: Yup.string()
    .min(2, "Password is too short!")
    .max(50, "Password is too long!")
    .required("Password is required field"),
});
function Signup() {
  const history = useHistory();
  async function onSubmit(values) {
    const newUser = await mutations.signup(values);
    const token = newUser.data.token;
    history.push("/");
    setIsLoggedIn(true, token);
  }
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
    },
    onSubmit: onSubmit,
    validationSchema,
  });

  const setIsDarkMode = useDarkMode((state) => state.setIsDarkMode);
  const isDarkMode = useDarkMode((state) => state.isDarkMode);
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);

  function onChange() {
    setIsDarkMode(!isDarkMode);
  }
  return (
    <Wrapper>
      <Container>
        <Title>worldgram</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            placeholder="Mobile Number or Email"
          />
          <Input
            placeholder="First Name"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            name="firstName"
          />
          <Input
            placeholder="Last Name"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            name="lastName"
          />
          <Input
            placeholder="Username"
            onChange={formik.handleChange}
            value={formik.values.username}
            name="username"
          />
          <Input
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            type="password"
          />
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
            Sign up
          </Submit>
        </Form>
      </Container>
      <SideContainer>
        <Label>
          Have an account?
          <StyledLink to="/login"> Log in </StyledLink>
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
export default Signup;
