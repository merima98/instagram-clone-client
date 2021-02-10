import React from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { Trash, ChevronLeft } from "react-feather";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import queries from "../../api/queries.js";
import mutations from "../../api/mutations.js";
import { BREAKPOINTS } from "../../constants";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColor};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.headerBorder};
  display: grid;
  width: 100%;
  margin: 64px auto;
  margin-bottom: 4rem;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    width: 65%;
  }
`;
const StyledPhotoHeader = styled.div`
  display: flex;
  padding: 10px;
`;
const UserInfo = styled.div`
  width: 100%;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  color: ${(props) => props.theme.colors.titleColor};
`;
const Image = styled.img`
  width: 100%;
  height: auto;
`;
const StyledContainer = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 14px;
`;

const UserInfoDescription = styled.div`
  width: 100%;
  font-size: 14px;
  padding-left: 4px;
`;
const Username = styled.span`
  cursor: pointer;
  font-weight: bold;
  color: ${(props) => props.theme.colors.titleColor};
`;
const Description = styled.span`
  font-weight: normal;
  color: ${(props) => props.theme.colors.titleColor};
`;

function DeletePost() {
  const queryClient = useQueryClient();
  const params = useParams();
  const history = useHistory();
  const postId = params.postId;

  const getPostByIdQuery = useQuery(["getPostById", postId], () =>
    queries.getPostById(postId)
  );
  const loggedUserQuery = useQuery("loggedUser", () => queries.loggedUser());
  const loggedUser = loggedUserQuery.data?.data || {};
  const post = getPostByIdQuery.data?.data || {};
  const user = post?.user || {};

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
    history.push(`/user/${user.username}`);
  }

  function goBack() {
    history.goBack();
  }

  function showUserProfile() {
    history.push(`/user/${user.username}`);
  }

  return (
    <div>
      <Header />
      <Container>
        <StyledPhotoHeader>
          <UserInfo>
            <ChevronLeft
              style={{ height: "14px", width: "14px" }}
              onClick={() => goBack()}
            />
          </UserInfo>
          <UserInfo onClick={() => showUserProfile()}>{user.username}</UserInfo>

          <UserInfo>
            {loggedUser.username === user.username && (
              <Trash
                style={{ height: "14px", width: "14px" }}
                onClick={() => deletePost()}
              />
            )}
          </UserInfo>
        </StyledPhotoHeader>
        <Image src={`${post.url}`} />
        <div>
          <StyledContainer>
            <UserInfoDescription>
              <Username onClick={() => showUserProfile()}>
                {user.username}
              </Username>{" "}
              <Description> {post.description}</Description>
            </UserInfoDescription>
          </StyledContainer>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default DeletePost;
