import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
  const { username } = props;
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const response = await queries.usersPosts(username);
    setPosts(response.data);
  }, [username]);

  return (
    <Wrapper>
      {posts.map((post) => {
        return <Image key={post.id} src={post.url} />;
      })}
    </Wrapper>
  );
}

export default UserPosts;
