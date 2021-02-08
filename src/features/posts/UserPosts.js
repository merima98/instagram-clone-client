import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

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
  const [clicked, setClicked] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [postId, setPostId] = useState(null);

  const getUsersPostsQuery = useQuery(["usersPosts", username], () =>
    queries.usersPosts(username)
  );
  const getPostByIdQuery = useQuery(["getPostById", postId], () =>
    queries.getPostById(postId)
  );

  const posts = getUsersPostsQuery.data?.data || [];
  const post = getPostByIdQuery.data?.data || {};
  const user = post?.user || {};
  async function showLargerImage(postId) {
    setClicked(true);
    setShowAll(false);
    setPostId(postId);
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
          clicked={clicked}
          setClicked={setClicked}
          showAll={showAll}
          setShowAll={setShowAll}
          setPostId={setPostId}
        />
      )}
    </Wrapper>
  );
}

export default UserPosts;
