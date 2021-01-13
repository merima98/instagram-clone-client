import React from "react";
import styled from "styled-components";
import { MapPin } from "react-feather";

import Login from "../login/Login";
import { BREAKPOINTS } from "../../constants";

const Wrapper = styled.div`
  display: block;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin: 0 auto;
    width: 80%;
  }
`;
const StyledImage = styled.div`
  display: none;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    padding-top: 6rem;
    text-align: center;
    display: block;
  }
`;
function Home() {
  return (
    <Wrapper>
      <StyledImage>
        <MapPin style={{ width: "10rem", height: "10rem", color: "#0095f6" }} />
      </StyledImage>
      <Login />
    </Wrapper>
  );
}

export default Home;
