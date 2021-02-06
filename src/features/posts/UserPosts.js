import React, { useEffect, useState } from "react";
import styled from "styled-components";

import queries from "../../api/queries.js";
import DeletePost from "./DeletePost.js";
const Wrapper = styled.div`
  display: ${(props) => (props.showAll ? "grid" : "flex")};
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

function UserPosts(props) {
  const { username } = props;
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [showAll, setShowAll] = useState(true);
  useEffect(async () => {
    if (username) {
      const response = await queries.usersPosts(username);
      setPosts(response.data);
    }
  }, [username, setPost, setClicked]);
  async function showLargerImage(postId) {
    setClicked(true);
    setShowAll(false);
    const response = await queries.getPostById(postId);
    if (post) {
      setPost(response.data);
      setUser(response.data.user);
    }
  }
  return (
    <Wrapper showAll={showAll}>
      {showAll &&
        posts.map((post) => {
          return (
            <Image
              key={post.id}
              src={post.url}
              onClick={() => showLargerImage(post.id)}
            />
          );
        })}
      {clicked && props.loggedUser === user.username && (
        <DeletePost
          key={post.id}
          url={post.url}
          description={post.description}
          username={user.username}
          userId={user.id}
          postId={post.id}
          posts={posts}
          setPosts={setPosts}
          clicked={clicked}
          setClicked={setClicked}
          showAll={showAll}
          setShowAll={setShowAll}
        />
      )}
    </Wrapper>
  );
}

export default UserPosts;
