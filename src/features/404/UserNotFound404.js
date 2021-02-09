import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 64px 20px;
  text-align: center;
`;
const ErrorMessage = styled.h1`
  font-size: 22px;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.titleColor};
`;
const Text = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.titleColor};
`;

function UserNotFound404() {
  return (
    <Wrapper>
      <ErrorMessage>Sorry, this page isn't available.</ErrorMessage>
      <Text>
        The link you followed may be broken, or the page may have been removed.
        Go back to Instagram.
      </Text>
    </Wrapper>
  );
}

export default UserNotFound404;
