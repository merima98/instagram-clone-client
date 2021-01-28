import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import { BREAKPOINTS } from "../../constants";

const Container = styled.div`
  padding-top: 4rem;
  width: 100%;
`;

const Form = styled.form`
  padding: 20px;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  width: 100%;
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.colors.headerBorder};
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    width: 80%;
  }
`;
const UserContainer = styled.div`
  display: grid;
  margin-bottom: 0.5rem;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    grid-template-columns: 1fr 2fr;
  }
`;

const Text = styled.span`
  color: ${(props) => props.theme.colors.titleColor};

  width: 80%;
  margin-bottom: 0.25rem;

  font-size: 14px;
  padding: 9px 0px 7px 8px;

  ${({ error }) =>
    error &&
    `
      border: 1px solid red;
      color: red;
    `}
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 0.25rem;
  background-color: ${(props) => props.theme.colors.backgroundColorInput};
  font-size: 14px;
  padding: 9px 0px 7px 8px;
  border-radius: 4px;
  border: 0.5px solid ${(props) => props.theme.colors.colorInputBorder};
  outline: none;

  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    width: 90%;
  }

  color: ${(props) => props.theme.colors.colorInput};
  ${({ error }) =>
    error &&
    `
      border: 1px solid red;
      color: red;
    `}
`;
const ErrorMessage = styled.div`
  margin-bottom: 0.25rem;
  font-size: 12px;
  padding: 9px 0px 7px 8px;
  border-radius: 4px;
  outline: none;
  color: red;
`;

const Submit = styled.button`
  padding: 5px 9px;
  background-color: ${(props) => props.theme.colors.backgroundColorSubmit};
  border-radius: 4px;
  border: none;
  color: ${(props) => props.theme.colors.color};
  outline: none;
  width: 20%;
  cursor: pointer;
`;
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Email is required field"),
  firstName: Yup.string()
    .min(2, "First name is too short!")
    .max(50, "First name is too long!")
    .required("First name is required field!"),
  lastName: Yup.string()
    .min(2, "Last name is too short!")
    .max(50, "Last name is too long!")
    .required("Last name is required field!"),
  username: Yup.string()
    .min(2, "Username is too short!")
    .max(50, "Username is too long!")
    .required("Username is required field!"),
  image: Yup.string().required("Paste URL!"),
});
function UpdateUserProfile() {
  const formik = useFormik({
    initialValues: {
      id: "",
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      image: "",
    },
    validationSchema,
    onSubmit: onSubmit,
  });

  async function onSubmit(values) {
    try {
    } catch (err) {
      if (
        err.response.data.exception === "UsernameAllreadyInUseException" &&
        err.response.data.exception !== "EmailAllreadyInUseException"
      ) {
        formik.setErrors({ username: "Username already in use!" });
      }
      if (
        err.response.data.exception === "EmailAllreadyInUseException" &&
        err.response.data.exception !== "UsernameAllreadyInUseException"
      ) {
        formik.setErrors({ email: "Email already in use!" });
      }
    }
  }
  return (
    <div>
      <Header />
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <UserContainer>
            <Text>First name</Text>
            <Input
              onChange={formik.handleChange}
              value={formik.values.firstName}
              name="firstName"
            />
            {formik.errors.firstName ? (
              <ErrorMessage>{formik.errors.firstName}</ErrorMessage>
            ) : null}
          </UserContainer>

          <UserContainer>
            <Text>Last name</Text>
            <Input
              onChange={formik.handleChange}
              value={formik.values.lastName}
              name="lastName"
            />
            {formik.errors.lastName ? (
              <ErrorMessage>{formik.errors.lastName}</ErrorMessage>
            ) : null}
          </UserContainer>

          <UserContainer>
            <Text>Username</Text>
            <Input
              onChange={formik.handleChange}
              value={formik.values.username}
              name="username"
              error={formik.errors.username && formik.touched.username}
            />
            {formik.errors.username ? (
              <ErrorMessage>{formik.errors.username}</ErrorMessage>
            ) : null}
          </UserContainer>

          <UserContainer>
            <Text>Email</Text>
            <Input
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              error={formik.errors.email && formik.touched.email}
            />
            {formik.errors.email ? (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            ) : null}
          </UserContainer>

          <UserContainer>
            <Text>Image</Text>
            <Input
              onChange={formik.handleChange}
              value={formik.values.image}
              name="image"
              error={formik.errors.url && formik.touched.url}
            />
            {formik.errors.image ? (
              <ErrorMessage>{formik.errors.image}</ErrorMessage>
            ) : null}
          </UserContainer>
          <UserContainer>
            <p></p>
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
              Change
            </Submit>
          </UserContainer>
        </Form>
      </Container>

      <Footer />
    </div>
  );
}

export default UpdateUserProfile;
