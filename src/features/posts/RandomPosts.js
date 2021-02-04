import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import queries from "../../api/queries";
import Post from "./Post";
import { BREAKPOINTS } from "../../constants";
import mutations from "../../api/mutations";
import Spinner from "../spinner/Spinner";

const PostsContainer = styled.div`
  display: grid;
  padding-top: 4rem;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 2.5rem;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    grid-template-columns: 2fr 1fr;
    width: 65%;
    margin-bottom: 0rem;
  }
`;
const UserInfoStyled = styled.div`
  display: none;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    display: block;
    padding-left: 50px;
    padding-top: 40px;
  }
`;

const UserUsername = styled.div`
  position: fixed;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => props.theme.colors.titleColor};
  font-size: 14px;

  overflow-wrap: anywhere;
`;

const UserFullName = styled.div`
  position: fixed;
  color: ${(props) => props.theme.colors.fullNameColor};
  font-size: 14px;
`;

function RandomPosts() {
  const [clickedLike, setClickedLike] = useState(false);
  const history = useHistory();
  const { data } = useQuery("posts", () => queries.randomPosts());
  const queryClient = useQueryClient();

  const mutation = useMutation(
    clickedLike
      ? async (data) => {
          setClickedLike(false);
          const response = await mutations.dislikePost(data);
          queryClient.getQueryData("posts");
          queryClient.setQueryData("posts", response);
        }
      : async (data) => {
          setClickedLike(true);
          const response = await mutations.likePost(data);
          queryClient.getQueryData("posts");
          queryClient.setQueryData("posts", response);
        }
  );

  const posts = data ? data.data : [];

  const user = useQuery("loggedUser", queries.loggedUser);
  function showUserProfile() {
    history.push(`/user/${user.username}`);
  }

  return (
    <div>
      <Header />
      <PostsContainer>
        {posts === null ? (
          <Spinner />
        ) : (
          <div>
            {posts.map((post) => {
              return (
                <Post
                  key={post.id}
                  url={post.url}
                  description={post.description}
                  username={post.user.username}
                  likeCount={post.likes.length}
                  userId={user.id}
                  postId={post.id}
                  likePost={() => mutation.mutate(post.id)}
                />
              );
            })}
          </div>
        )}
        <div>
          <UserInfoStyled>
            <UserUsername onClick={() => showUserProfile()}>
              {user.username}
            </UserUsername>
          </UserInfoStyled>
          <UserInfoStyled>
            <UserFullName>
              {user.firstName} {user.lastName}
            </UserFullName>
          </UserInfoStyled>
        </div>
      </PostsContainer>
      <Footer />
    </div>
  );
}

export default RandomPosts;
