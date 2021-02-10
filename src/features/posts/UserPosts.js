import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import queries from "../../api/queries.js";

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

function UserPosts(props) {
  const history = useHistory();
  const { username } = props;

  const getUsersPostsQuery = useQuery(["usersPosts", username], () =>
    queries.usersPosts(username)
  );
  const posts = getUsersPostsQuery.data?.data || [];

  async function showLargerImage(postId) {
    history.push(`/post/${postId}`);
  }

  return (
    <Wrapper>
      {posts.map((post) => {
        return (
          <Image
            key={post.id}
            src={post.url}
            onClick={() => showLargerImage(post.id)}
          />
        );
      })}
    </Wrapper>
  );
}

export default UserPosts;
