import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";

import queries from "../../api/queries";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import UserPosts from "../posts/UserPosts.js";
import { BREAKPOINTS } from "../../constants";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 80%;
`;
const Image = styled.img`
  padding: 10px;
  border-radius: 50%;
  margin: 0 auto;
  width: 80px;
  height: 80px;
  object-fit: cover;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    width: 150px;
    height: 150px;
  }
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

const StyledUpdate = styled.div`
  display: flex;
  overflow-wrap: anywhere;
  flex-direction: row;
  align-items: center;
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.body};
  outline: none;
  color: ${(props) => props.theme.colors.titleColor};
  border: 1px solid ${(props) => props.theme.colors.headerBorder};
  border-radius: 2px;
  padding: 2.5px;
  cursor: pointer;
`;

function UserProfile() {
  const history = useHistory();
  const params = useParams();
  const username = params.username;
  const [showEdit, setShowEdit] = useState(false);

  const loggedUserQuery = useQuery("loggedUser", () => queries.loggedUser());
  const loggedUser = loggedUserQuery.data?.data || {};

  const userQuery = useQuery("user", () => queries.user(username));
  const user = userQuery.data?.data || {};

  function showUpdatePage() {
    history.push(`/update`);
  }

  useEffect(async () => {
    try {
      if (user.username === loggedUser.username) {
        setShowEdit(true);
      }
    } catch (err) {}
  }, [params.username]);

  return (
    <Wrapper>
      <Header />
      <UserStyledInformation>
        <Image src={`${user.image}`} />
        <div>
          <StyledUpdate>
            <Username>{user.username}</Username>
            {showEdit && (
              <StyledButton onClick={() => showUpdatePage()}>
                Edit Profile
              </StyledButton>
            )}
          </StyledUpdate>
          <FullName>
            {user.firstName} {user.lastName}
          </FullName>
        </div>
      </UserStyledInformation>
      <UserPosts loggedUser={loggedUser.username} username={user.username} />
      <Footer />
    </Wrapper>
  );
}

export default UserProfile;
