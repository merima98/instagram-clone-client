import React from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { Home, User, Search, Moon, Sun, LogOut } from "react-feather";
import { useQuery } from "react-query";

import { BREAKPOINTS } from "../../constants";
import { useAuth, useDarkMode } from "../../state";
import queries from "../../api/queries.js";

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

const StyledTheme = styled.span`
  text-decoration: none;
  color: ${(props) => props.theme.colors.titleColor};
  margin-right: 1rem;
`;

function Footer() {
  const setIsDarkMode = useDarkMode((state) => state.setIsDarkMode);
  const isDarkMode = useDarkMode((state) => state.isDarkMode);
  const history = useHistory();
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
  const loggedUserQuery = useQuery("loggedUser", () => queries.loggedUser());
  const user = loggedUserQuery.data?.data || {};

  function onChange() {
    setIsDarkMode(!isDarkMode);
  }

  function logout() {
    const token = null;
    history.push("/");
    setIsLoggedIn(false, token);
  }
  return (
    <StyledFooter>
      <StyledNavLink>
        <Links exact to="/">
          <Home style={{ height: "16px", width: "16px" }} />
        </Links>
        <Links exact to="/explore">
          <Search style={{ height: "16px", width: "16px" }} />
        </Links>
        <Links exact to={`/user/${user.username}`}>
          <User style={{ height: "16px", width: "16px" }} />
        </Links>
        <StyledTheme onClick={onChange}>
          {isDarkMode ? (
            <Sun
              style={{
                cursor: "pointer",
                height: "16px",
                width: "16px",
              }}
            />
          ) : (
            <Moon
              style={{
                cursor: "pointer",
                height: "16px",
                width: "16px",
              }}
            />
          )}
        </StyledTheme>
        <StyledTheme onClick={logout}>
          <LogOut
            style={{ height: "16px", width: "16px", cursor: "pointer" }}
          />
        </StyledTheme>
      </StyledNavLink>
    </StyledFooter>
  );
}

export default Footer;
