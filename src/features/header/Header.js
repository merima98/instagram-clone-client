import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Home, Compass } from "react-feather";

import SearchUserForm from "../user/SearchUserForm";
import { BREAKPOINTS } from "../../constants";
import Popper from "./Popper";

const StyledHeader = styled.div`
  justify-content: start;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  display: flex;
  flex-direction: row;
  padding: 10px;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    justify-content: space-evenly;
  }
  border-bottom: 1px solid ${(props) => props.theme.colors.headerBorder};
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
function goToTheTop() {
  window.scrollTo(0, 0);
}

function Header() {
  return (
    <StyledHeader>
      <Title exact to="/" onClick={() => goToTheTop()}>
        worldgram
      </Title>
      <SearchUserForm />
      <StyledNavLink>
        <Links exact to="/" onClick={() => goToTheTop()}>
          <Home />
        </Links>
        <Links exact to="/explore">
          <Compass onClick={() => goToTheTop()} />
        </Links>
        <Popper />
      </StyledNavLink>
    </StyledHeader>
  );
}

export default Header;
