import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Home, User, Send } from "react-feather";

import SearchUserForm from "../user/SearchUserForm";
import { BREAKPOINTS } from "../../constants";

const StyledHeader = styled.div`
  justify-content: start;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: white;
  display: flex;
  flex-direction: row;
  padding: 10px;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    justify-content: space-evenly;
  }
`;

const Title = styled(NavLink)`
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  color: ${(props) => props.theme.colors.titleColor};
  padding-top: 4px;
`;

const StyledNavLink = styled.div`
  display: none;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    display: block;
  }
`;

const Links = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.titleColor};
  margin-right: 1.2rem;
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
