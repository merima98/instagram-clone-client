import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import queries from "../../api/queries";
import { BREAKPOINTS } from "../../constants";
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

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  grid-gap: 0.5rem;
`;
const Image = styled.img`
  object-fit: cover;
  height: 20vw;
  width: 100%;
  cursor: pointer;
`;

function RandomPosts() {
  const history = useHistory();
  const randomPostsQuery = useQuery("randomPosts", () => queries.randomPosts());
  const loggedUserQuery = useQuery("loggedUser", () => queries.loggedUser());
  const posts = randomPostsQuery.data?.data || [];
  const user = loggedUserQuery.data?.data || {};

  function showUserProfile() {
    history.push(`/user/${user.username}`);
  }

  return (
    <div>
      <Header />
      <PostsContainer>
        {randomPostsQuery.isLoading ? (
          <Spinner />
        ) : (
          <div>
            <Wrapper>
              {posts.map((post) => {
                return <Image key={post.id} src={post.url} />;
              })}
            </Wrapper>
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
