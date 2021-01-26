import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Home, User, Search } from "react-feather";

import { BREAKPOINTS } from "../../constants";

const StyledFooter = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 10px;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    display: none;
  }
  border-top: 1px solid ${(props) => props.theme.colors.footerBorder};
`;

const StyledNavLink = styled.div`
  display: block;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    display: none;
  }
`;

const Links = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.titleColor};
  margin-right: 1rem;
`;

function Footer() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <StyledFooter>
      <StyledNavLink>
        <Links exact to="/">
          <Home style={{ height: "16px", width: "16px" }} />
        </Links>
        <Links exact to="/">
          <Search style={{ height: "16px", width: "16px" }} />
        </Links>
        <Links exact to={`/user/${user.username}`}>
          <User style={{ height: "16px", width: "16px" }} />
        </Links>
      </StyledNavLink>
    </StyledFooter>
  );
}

export default Footer;
