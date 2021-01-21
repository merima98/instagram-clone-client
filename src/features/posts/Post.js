import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid ${(props) => props.theme.colors.headerBorder};
`;
const UserInfo = styled.div`
  width: 100%;
  padding: 20px;
  font-size: 14px;
`;
const Description = styled.div`
  width: 100%;
  padding: 20px;
  font-size: 14px;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
`;
function Post(props) {
  const { url, description, username } = props;
  return (
    <Wrapper>
      <UserInfo>{username}</UserInfo>
      <Image src={`${url}`} />
      <Description>{description} </Description>
    </Wrapper>
  );
}

export default Post;
