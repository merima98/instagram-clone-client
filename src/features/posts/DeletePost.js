import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Trash, ChevronLeft } from "react-feather";

import mutations from "../../api/mutations.js";

const Wrapper = styled.div`
  position: fixed;
  margin: 0 25%;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.headerBorder};
`;

const StyledPhotoHeader = styled.div`
  display: flex;
`;
const UserInfo = styled.div`
  width: 100%;
  padding: 20px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  color: ${(props) => props.theme.colors.titleColor};
`;

const StyledContainer = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 14px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const UserInfoDescription = styled.div`
  width: 100%;
  font-size: 14px;
  padding-left: 4px;
`;

const Description = styled.span`
  font-weight: normal;
  color: ${(props) => props.theme.colors.titleColor};
`;

const Username = styled.span`
  cursor: pointer;
  font-weight: bold;
  color: ${(props) => props.theme.colors.titleColor};
`;

function DeletePost(props) {
  const history = useHistory();
  const { url, description, username, postId } = props;
  function showUserProfile() {
    history.push(`/user/${username}`);
  }

  async function deletePost() {
    await mutations.deletePostsFromLikes(postId);
    const post = await mutations.deletePost(postId);
    props.setClicked(false);
    props.setPosts(post.data);
  }

  function goBack() {
    props.setClicked(false);
  }

  return (
    <Wrapper>
      <StyledPhotoHeader>
        <UserInfo>
          <ChevronLeft
            style={{ height: "14px", width: "14px" }}
            onClick={() => goBack()}
          />
        </UserInfo>
        <UserInfo onClick={() => showUserProfile()}>{username}</UserInfo>
        <UserInfo>
          <Trash
            style={{ height: "14px", width: "14px" }}
            onClick={() => deletePost()}
          />
        </UserInfo>
      </StyledPhotoHeader>
      <Image src={`${url}`} />
      <div>
        <StyledContainer>
          <UserInfoDescription>
            <Username onClick={() => showUserProfile()}>{username}</Username>{" "}
            <Description> {description}</Description>
          </UserInfoDescription>
        </StyledContainer>
      </div>
    </Wrapper>
  );
}

export default DeletePost;
