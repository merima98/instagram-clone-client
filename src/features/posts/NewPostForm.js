import React from "react";
import styled from "styled-components";
import { ChevronLeft } from "react-feather";
import { useHistory } from "react-router-dom";

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
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.colors.backgroundColorInput};
  border: 0.5px solid ${(props) => props.theme.colors.colorInputBorder};
  font-size: 14px;
  padding: 9px 0px 7px 8px;
  outline: none;
  border-radius: 4px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1rem;
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

function NewPostForm() {
  const history = useHistory();
  function onBack() {
    history.goBack();
  }
  return (
    <div>
      <StyledHeader>
        <ChevronLeft onClick={onBack} style={{ cursor: "pointer" }} />
        <Title>New post</Title>
        <Submit type="submit">Share</Submit>
      </StyledHeader>
      <PostsContainer>
        <Input placeholder="Write a caption..." />
        <Input placeholder="Image URL" />
      </PostsContainer>
    </div>
  );
}

export default NewPostForm;