import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Trash, ChevronLeft } from "react-feather";
import { useQueryClient, useMutation } from "react-query";

import mutations from "../../api/mutations.js";
import { BREAKPOINTS } from "../../constants";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColor};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.headerBorder};
`;

const StyledPhotoHeader = styled.div`
  display: flex;
`;
const UserInfo = styled.div`
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    padding: 20px;
  }
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  color: ${(props) => props.theme.colors.titleColor};
`;
const StyledContainer = styled.div`
  display: flex;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 20vw;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    height: auto;
  }
`;
const UserInfoDescription = styled.div`
  font-size: 14px;
  padding-left: 5px;
  padding-bottom: 5px;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    padding-left: 20px;
  }
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
  const queryClient = useQueryClient();
  const history = useHistory();
  const { url, description, username, postId } = props;
  function showUserProfile() {
    history.push(`/user/${username}`);
  }

  const deletePostMutation = useMutation(() => mutations.deletePost(postId), {
    onSuccess: () => {
      return queryClient.refetchQueries("usersPosts");
    },
  });
  const deletePostFromLikesMutation = useMutation(
    () => mutations.deletePostsFromLikes(postId),
    {
      onSuccess: () => {
        return queryClient.refetchQueries("usersPosts");
      },
    }
  );

  async function deletePost() {
    deletePostFromLikesMutation.mutate();
    deletePostMutation.mutate();
    props.setPostId(null);
    props.setClicked(false);
    props.setShowAll(true);
  }

  function goBack() {
    props.setClicked(false);
    props.setShowAll(true);
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
      <StyledContainer>
        <UserInfoDescription>
          <Username onClick={() => showUserProfile()}>{username}</Username>{" "}
          <Description> {description}</Description>
        </UserInfoDescription>
      </StyledContainer>
    </Wrapper>
  );
}

export default DeletePost;
