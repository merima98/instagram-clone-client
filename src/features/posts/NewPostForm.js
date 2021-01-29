import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";

import mutations from "../../api/mutations";

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  padding-top: 2rem;
  padding-bottom: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
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

function NewPostForm(props) {
  const formik = useFormik({
    initialValues: {
      url: "",
      description: "",
    },
    onSubmit,
    validationSchema,
  });

  async function onSubmit(values) {
    try {
      const newPost = await mutations.createPost(values);
      props.setPosts([newPost.data, ...props.posts]);
      formik.resetForm();
    } catch (err) {}
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
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
          <Submit type="submit">Share</Submit>
        </PostsContainer>
      </form>
    </div>
  );
}

export default NewPostForm;
