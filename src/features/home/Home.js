import React from "react";
import styled from "styled-components";

import Login from "../login/Login";
import { BREAKPOINTS } from "../../constants";
import homeImage from "../../images/homeImg.jpg";

const Wrapper = styled.div`
  display: block;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0 auto;
    width: 70%;
  }
`;

const StyledImage = styled.div`
  display: none;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    padding-top: 3.2rem;
    width: 90%;
    height: 80%;
    display: block;
  }
`;

const Image = styled.img.attrs({
  src: homeImage,
})`
  width: 100%;
  height: 100%;
  border-radius: 2%;
`;
function Home() {
  return (
    <Wrapper>
      <StyledImage>
        <Image />
      </StyledImage>
      <Login />
    </Wrapper>
  );
}

export default Home;
