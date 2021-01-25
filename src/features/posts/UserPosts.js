import React, { useEffect, useState } from "react";
import styled from "styled-components";

import queries from "../../api/queries.js";
import { BREAKPOINTS } from "../../constants";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  grid-gap: 0.5rem;
`;
const Image = styled.img`
  height: 120px;
  width: 100%;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    height: 293px;
  }
  cursor: pointer;
`;

function UserPosts(props) {
  const { username } = props;
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const response = await queries.usersPosts(username);
    console.log("Posts of user are: ", response.data);
    setPosts(response.data);
  }, [username]);

  console.log("Username is, ", username);
  return (
    <Wrapper>
      {posts.map((post) => {
        return <Image key={post.id} src={post.url} />;
      })}
    </Wrapper>
  );
}

export default UserPosts;
