import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import queries from "../../api/queries";
import Post from "./Post";
import { BREAKPOINTS } from "../../constants";
import mutations from "../../api/mutations";
import NewPostForm from "./NewPostForm";

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
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [clickedLike, setClickedLike] = useState(false);
  const history = useHistory();

  useEffect(async () => {
    try {
      const response = await queries.posts();
      const data = await response.data;
      setPosts(data);
      setUser(JSON.parse(localStorage.getItem("user")));
    } catch (err) {}
  }, [setPosts, setUser]);

  async function likePost(postId) {
    if (!clickedLike) {
      const response = await mutations.likePost(postId, user.id);
      setClickedLike(!clickedLike);
      setPosts(response.data);
    }
    if (clickedLike) {
      const response = await mutations.dislikePost(postId, user.id);
      setClickedLike(!clickedLike);
      setPosts(response.data);
    }
  }

  function showUserProfile() {
    history.push(`/user/${user.username}`);
  }

  return (
    <div>
      <Header />
      <PostsContainer>
        <div>
          <NewPostForm posts={posts} setPosts={setPosts} />
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
                likePost={() => likePost(post.id)}
              />
            );
          })}
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
