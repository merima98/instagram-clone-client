import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import queries from "../../api/queries";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import UserPosts from "../posts/UserPosts.js";
import { BREAKPOINTS } from "../../constants";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 80%;
`;
const Image = styled.div`
  padding: 30px;
  color: ${(props) => props.theme.colors.titleColor};
`;
const UserStyledInformation = styled.div`
  display: grid;
  padding-top: 4rem;
  width: 80%;
  margin: 0 auto;
  border-bottom: 1px solid ${(props) => props.theme.colors.headerBorder};
  width: 100%;
  margin-bottom: 2rem;

  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
`;
const Username = styled.div`
  padding: 14px;
  font-size: 25px;
  color: ${(props) => props.theme.colors.titleColor};
`;
const FullName = styled.div`
  padding: 14px;
  color: ${(props) => props.theme.colors.titleColor};
  font-weight: bold;
`;

function UserProfile() {
  const params = useParams();
  const username = params.username;
  const [user, setUser] = useState({});

  useEffect(async () => {
    try {
      const response = await queries.user(username);
      setUser(response.data);
    } catch (err) {}
  }, [setUser]);
  return (
    <Wrapper>
      <Header />
      <UserStyledInformation>
        <Image>Image</Image>
        <div>
          <Username>{user.username}</Username>
          <FullName>
            {user.firstName} {user.lastName}
          </FullName>
        </div>
      </UserStyledInformation>
      <UserPosts username={user.username} />
      <Footer />
    </Wrapper>
  );
}

export default UserProfile;
