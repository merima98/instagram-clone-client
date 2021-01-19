import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Home, User, Send } from "react-feather";

import SearchUserForm from "../user/SearchUserForm";

const StyledHeader = styled.div`
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 10px;
`;

const Title = styled(NavLink)`
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  color: ${(props) => props.theme.colors.titleColor};
  padding-top: 4px;
`;

const StyledNavLink = styled.div``;

const Links = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.titleColor};
  margin-right: 1.5rem;
`;

function Header() {
  return (
    <StyledHeader>
      <Title exact to="/">
        worldgram
      </Title>
      <SearchUserForm />
      <StyledNavLink>
        <Links exact to="/">
          <Home />
        </Links>
        <Links exact to="/">
          <Send />
        </Links>
        <Links exact to="/">
          <User />
        </Links>
      </StyledNavLink>
    </StyledHeader>
  );
}

export default Header;
