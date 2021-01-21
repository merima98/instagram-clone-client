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
  width: 65%;
  margin: 0 auto;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    grid-template-columns: 2fr 1fr;
  }
`;
const UserInfoStyled = styled.div`
  display: none;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    display: block;
    padding: 40px;
  }
`;

const UserInfo = styled.div`
  position: fixed;
`;

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    try {
      const response = await queries.posts();
      const data = await response.data;
      setPosts(data);
    } catch (err) {}
  }, [setPosts]);
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
              />
            );
          })}
        </div>
        <UserInfoStyled>
          <UserInfo>username</UserInfo>
        </UserInfoStyled>
      </PostsContainer>
      <Footer />
    </div>
  );
}

export default Posts;
