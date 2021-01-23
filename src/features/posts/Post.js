import React from "react";
import styled from "styled-components";
import { Heart } from "react-feather";
import { useHistory } from "react-router-dom";

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
  cursor: pointer;
  font-weight: bold;
`;

const PostInformations = styled.div``;
const StyledLike = styled.div`
  width: 100%;
  padding: 10px;
`;
const StyledContainer = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 14px;
`;
const StyledLikes = styled.div`
  width: 100%;
  padding-left: 14px;
  font-size: 12px;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
`;

const UserInfoDescription = styled.div`
  width: 100%;
  font-size: 14px;

  padding-left: 4px;
`;

const Description = styled.span`
  font-weight: normal;
`;

const Username = styled.span`
  cursor: pointer;
  font-weight: bold;
`;

function Post(props) {
  const history = useHistory();

  const { url, description, username, likeCount } = props;
  function showUserProfile() {
    history.push(`/${username}`);
  }
  return (
    <Wrapper>
      <UserInfo onClick={() => showUserProfile()}>{username}</UserInfo>
      <Image src={`${url}`} />
      <PostInformations>
        <StyledLike>
          <Heart
            style={{ height: "20px", width: "20px", cursor: "pointer" }}
            onClick={props.likePost}
          />{" "}
        </StyledLike>
        {likeCount > 0 && <StyledLikes>Liked by {likeCount} users</StyledLikes>}
        <StyledContainer>
          <UserInfoDescription>
            <Username onClick={() => showUserProfile()}>{username}</Username>{" "}
            <Description> {description}</Description>
          </UserInfoDescription>
        </StyledContainer>
      </PostInformations>
    </Wrapper>
  );
}

export default Post;
