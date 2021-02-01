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
    position: fixed;
    white-space: normal;
    padding-left: 50px;
    padding-top: 40px;
    z-index: -1;
  }
`;

const UserUsername = styled.div`
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.titleColor};
  font-size: 14px;
`;

const UserFullName = styled.div`
  color: ${(props) => props.theme.colors.fullNameColor};
  font-size: 14px;
`;

function Posts() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [clickedLike, setClickedLike] = useState(false);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    try {
      const response = await queries.posts();
      const data = await response.data;
      setPosts(data);
      const userResponse = await queries.loggedUser();
      setUser(userResponse.data);
      setIsLoading(false);
    } catch (err) {}
  }, [setPosts, setUser]);

  async function likePost(postId) {
    if (clickedLike === false) {
      setClickedLike(true);
      const response = await mutations.likePost(postId);
      setPosts(response.data);
    }
    if (clickedLike === true) {
      setClickedLike(false);
      const response = await mutations.dislikePost(postId);
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
          {isLoading ? (
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
                    likePost={() => likePost(post.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div>
          <UserInfoStyled>
            <UserUsername onClick={() => showUserProfile()}>
              {user.username}
            </UserUsername>
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
