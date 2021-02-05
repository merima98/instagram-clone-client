import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import queries from "../../api/queries";
import Post from "./Post";
import { BREAKPOINTS } from "../../constants";
import mutations from "../../api/mutations";
import NewPostForm from "./NewPostForm";
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
`;

const UserFullName = styled.div`
  position: fixed;
  color: ${(props) => props.theme.colors.fullNameColor};
  font-size: 14px;
`;

function Posts() {
  const [clickedLike, setClickedLike] = useState(false);
  const history = useHistory();
  const user = useQuery("loggedUser", queries.loggedUser);
  function showUserProfile() {
    history.push(`/user/${user.username}`);
  }

  const { data } = useQuery("posts", () => queries.posts());
  const posts = data ? data.data : [];

  const likePostMutation = useMutation(mutations.likePost, {
    onSuccess: (data) => {
      posts.map((post) => {
        if (Number(post.id) === Number(data.data.postId)) {
          const newLikes = post.likes;
          newLikes.push(data.data.likes);
          return { ...post, likes: newLikes };
        }
        return post;
      });
    },
  });

  const dislikePostMutation = useMutation(mutations.dislikePost, {
    onSuccess: (data) => {
      posts.map((post) => {
        if (Number(post.id) === Number(data.data.postId)) {
          const newLikes = post.likes;
          newLikes.pop();
          return { ...post, likes: newLikes };
        }
        return post;
      });
    },
  });

  async function handleOnLike(id) {
    if (clickedLike) {
      setClickedLike(false);
      return dislikePostMutation.mutate(id);
    } else {
      setClickedLike(true);
      return likePostMutation.mutate(id);
    }
  }
  return (
    <div>
      <Header />
      <PostsContainer>
        <div>
          <NewPostForm posts={posts} />
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
                    likePost={() => handleOnLike(post.id)}
                  />
                );
              })}{" "}
            </div>
          )}
        </div>
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

export default Posts;
