import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

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
    width: 65%;
    margin-bottom: 0rem;
  }
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
  const posts = randomPostsQuery.data?.data || [];

  async function showLargerImage(postId) {
    history.push(`/post/${postId}`);
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
                return (
                  <Image
                    key={post.id}
                    src={post.url}
                    onClick={() => showLargerImage(post.id)}
                  />
                );
              })}
            </Wrapper>
          </div>
        )}
      </PostsContainer>
      <Footer />
    </div>
  );
}

export default RandomPosts;
