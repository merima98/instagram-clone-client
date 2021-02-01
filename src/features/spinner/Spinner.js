import React from "react";
import styled, { keyframes } from "styled-components";

import { BREAKPOINTS } from "../../constants";

const Wrapper = styled.div`
  padding: 64px 20px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    width: 10rem;
    height: 10rem;
  }
  animation: ${rotate} 4s linear infinite;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border-left: 2px solid transparent;
  border-bottom: 2px solid ${(props) => props.theme.colors.spinner};
  border-right: 2px solid ${(props) => props.theme.colors.spinner};
  margin: 0 auto;
`;

function Spinner() {
  return (
    <Wrapper>
      <StyledSpinner />
    </Wrapper>
  );
}

export default Spinner;
