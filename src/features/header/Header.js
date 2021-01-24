import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { Home, User, Send, PlusSquare, Moon, Sun } from "react-feather";

import SearchUserForm from "../user/SearchUserForm";
import { BREAKPOINTS } from "../../constants";
import { useAuth, useDarkMode } from "../../state";

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

const UserSyyledIcon = styled.span`
  text-decoration: none;
  color: ${(props) => props.theme.colors.titleColor};
  margin-right: 1.2rem;
  cursor: pointer;
`;

const StyledDropDown = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.colors.backgroundColor};

  list-style-type: none;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  top: 3.2rem;
  width: 25%;
  @media (min-width: ${BREAKPOINTS.LARGE_DEVICES}) {
    width: 15%;
  }
  border: 0.5px solid ${(props) => props.theme.colors.headerBorder};
`;

const StyledDropDownContent = styled.li`
  font-size: 12px;
  padding: 10px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.titleColor};
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.colors.body};
  }
`;
function Header() {
  const [clicked, setIsClicked] = useState(false);
  const setIsDarkMode = useDarkMode((state) => state.setIsDarkMode);
  const isDarkMode = useDarkMode((state) => state.isDarkMode);
  const history = useHistory();
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);

  function onChange() {
    setIsDarkMode(!isDarkMode);
  }
  async function logout() {
    const token = null;
    history.push("/");
    setIsLoggedIn(false, token);
  }
  function showDropDown() {
    setIsClicked(!clicked);
  }

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
        <Links exact to="/newPost">
          <PlusSquare />
        </Links>
        <UserSyyledIcon onClick={showDropDown}>
          <User />
        </UserSyyledIcon>
        {clicked && (
          <StyledDropDown>
            <StyledDropDownContent>
              <User
                style={{ width: "12px", height: "12px", marginRight: "4px" }}
              />
              Profile
            </StyledDropDownContent>
            <StyledDropDownContent onClick={onChange}>
              {" "}
              {isDarkMode ? (
                <Sun
                  style={{
                    cursor: "pointer",
                    color: "#8B8D90",
                    height: "12px",
                    width: "12px",
                  }}
                />
              ) : (
                <Moon
                  style={{
                    cursor: "pointer",
                    color: "#000",
                    height: "12px",
                    width: "12px",
                  }}
                />
              )}{" "}
              Change theme
            </StyledDropDownContent>
            <StyledDropDownContent onClick={logout}>
              Log Out
            </StyledDropDownContent>
          </StyledDropDown>
        )}
      </StyledNavLink>
    </StyledHeader>
  );
}

export default Header;
