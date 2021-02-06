import React, { useState, useRef, useEffect } from "react";
import { useClickAway } from "react-use";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { User, Moon, Sun } from "react-feather";
import { useHistory, NavLink } from "react-router-dom";
import { useQuery } from "react-query";

import { useAuth, useDarkMode } from "../../state";
import { BREAKPOINTS } from "../../constants";
import queries from "../../api/queries.js";

const DropdownContainer = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  position: ${(props) => (props.visible ? "fixed" : "none")};
  width: 6rem;
  left: 1rem;
  @media (min-width: ${BREAKPOINTS.LARGE_DEVICES}) {
    width: 8rem;
    left: 0rem;
  }
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.headerBorder};
  background-color: ${(props) => props.theme.colors.backgroundColor};
  padding: 5px;
`;

const StyledDropDownContent = styled.div`
  font-size: 12px;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  color: ${(props) => props.theme.colors.titleColor};
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.colors.body};
  }
`;

const UserProfile = styled(NavLink)`
  text-decoration: none;
  font-size: 12px;
  padding: 10px;
  z-index: 1;
  cursor: pointer;
  color: ${(props) => props.theme.colors.titleColor};
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.colors.body};
  }
`;

function Popper() {
  const setIsDarkMode = useDarkMode((state) => state.setIsDarkMode);
  const isDarkMode = useDarkMode((state) => state.isDarkMode);
  const history = useHistory();
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
  const [visible, setVisibility] = useState(false);
  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const loggedUserQuery = useQuery("loggedUser", () => queries.loggedUser());
  const user = loggedUserQuery.data?.data || {};

  const { styles } = usePopper(referenceRef.current, popperRef.current, {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [-65, 17],
        },
      },
    ],
  });

  function handleDropdownClick() {
    setVisibility(!visible);
  }

  function onChange() {
    setIsDarkMode(!isDarkMode);
  }
  function logout() {
    const token = null;
    history.push("/");
    setIsLoggedIn(false, token);
  }
  function onMouseEvent() {
    setVisibility(false);
  }

  useClickAway(popperRef, onMouseEvent, ["mousedown"]);
  return (
    <span>
      <User
        onClick={handleDropdownClick}
        ref={referenceRef}
        style={{ color: isDarkMode ? "#fff" : "#000", cursor: "pointer" }}
      />
      <div ref={popperRef} style={styles.popper}>
        <DropdownContainer visible={visible}>
          <UserProfile exact to={`/user/${user.username}`}>
            <User
              style={{ width: "12px", height: "12px", marginRight: "4px" }}
            />
            Profile
          </UserProfile>
          <StyledDropDownContent onClick={onChange}>
            {isDarkMode ? (
              <Sun
                style={{
                  cursor: "pointer",
                  height: "12px",
                  width: "12px",
                }}
              />
            ) : (
              <Moon
                style={{
                  cursor: "pointer",
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
        </DropdownContainer>
      </div>
    </span>
  );
}
export default Popper;
