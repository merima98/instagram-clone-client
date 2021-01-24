import React from "react";
import styled from "styled-components";
import { ChevronLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { BREAKPOINTS } from "../../constants";
import mutations from "../../api/mutations";
import { useDarkMode } from "../../state";

const StyledHeader = styled.div`
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: space-evenly;
  border-bottom: 1px solid ${(props) => props.theme.colors.headerBorder};
`;

const Title = styled.div`
  color: ${(props) => props.theme.colors.titleColor};
  background-color: ${(props) => props.theme.colors.backgroundColor};
  font-weight: bold;
  font-size: 0.8rem;
  padding-top: 6px;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10rem auto;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  padding-top: 2rem;
  padding-bottom: 1rem;
  border-radius: 8px;
  width: 80%;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    width: 50%;
  }
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.colors.backgroundColorInput};
  border: 0.5px solid ${(props) => props.theme.colors.colorInputBorder};
  font-size: 14px;
  padding: 9px 0px 7px 8px;
  outline: none;
  border-radius: 16px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1rem;
  ${({ error }) =>
    error &&
    `
      border: 1px solid red;
      color: red;
    `}
`;

const Submit = styled.button`
  color: ${(props) => props.theme.colors.sharePostButton};
  outline: none;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  padding-top: 4px;
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  font-weight: bold;
  width: 80%;
  margin: 0 auto;
  text-align: center;
`;

const validationSchema = Yup.object().shape({
  url: Yup.string().required("Paste URL!"),
});

function NewPostForm() {
  const isDarkMode = useDarkMode((state) => state.isDarkMode);
  const history = useHistory();
  function onBack() {
    history.goBack();
  }

  const formik = useFormik({
    initialValues: {
      userId: JSON.parse(localStorage.getItem("user")).id,
      url: "",
      description: "",
    },
    onSubmit,
    validationSchema,
  });

  async function onSubmit(values) {
    try {
      await mutations.createPost(values);
      history.push("/");
    } catch (err) {}
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <StyledHeader>
          <ChevronLeft
            onClick={onBack}
            style={{ cursor: "pointer", color: isDarkMode ? "#fff" : "#000" }}
          />
          <Title>New post</Title>
          <Submit type="submit">Share</Submit>
        </StyledHeader>
        <PostsContainer>
          <Input
            name="description"
            placeholder="Write a caption..."
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <Input
            name="url"
            placeholder="Image URL"
            onChange={formik.handleChange}
            value={formik.values.url}
            error={formik.errors.url && formik.touched.url}
          />
          {formik.errors.url ? (
            <ErrorMessage>{formik.errors.url}</ErrorMessage>
          ) : null}
        </PostsContainer>
      </form>
    </div>
  );
}

export default NewPostForm;
