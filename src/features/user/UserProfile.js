import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import queries from "../../api/queries";
import Header from "../header/Header";
const Wrapper = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const UserStyledInformation = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;
const UserInformation = styled.div`
  padding: 14px;
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
        <div>Image</div>
        <div>
          <UserInformation>{user.id}</UserInformation>
          <UserInformation>{user.username}</UserInformation>
        </div>
      </UserStyledInformation>
    </Wrapper>
  );
}

export default UserProfile;
