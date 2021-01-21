import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import queries from "../../api/queries";
import Post from "./Post";
import { BREAKPOINTS } from "../../constants";

const PostsContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  padding-top: 54px;
  width: 100%;
  margin: 0 auto;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    grid-template-columns: 2fr 1fr;
    width: 65%;
  }
`;
const UserInfoStyled = styled.div`
  display: none;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    display: block;
    padding-top: 2rem;
    padding-left: 10rem;
  }
`;

const UserUsername = styled.div`
  position: fixed;
  font-weight: bold;
  cursor: pointer;
`;

const UserFullName = styled.div`
  position: fixed;
  color: #8e8e8e;
`;

function Posts() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(async () => {
    try {
      const response = await queries.posts();
      const data = await response.data;
      setPosts(data);
      setUser(JSON.parse(localStorage.getItem("user")));
    } catch (err) {}
  }, [setPosts, setUser]);
  return (
    <div>
      <Header />
      <PostsContainer>
        <div>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                url={post.url}
                description={post.description}
                username={post.user.username}
              />
            );
          })}
        </div>
        <div>
          <UserInfoStyled>
            <UserUsername>{user.username}</UserUsername>
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
