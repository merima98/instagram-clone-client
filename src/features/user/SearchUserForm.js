import React from "react";
import styled from "styled-components";

const Input = styled.input`
  background-color: ${(props) => props.theme.colors.serachBackgroundColorInput};
  outline: none;
  border: 1px solid ${(props) => props.theme.colors.serachBorderInput};
  text-align: center;
`;

function SearchUserForm() {
  return <Input placeholder="Search" />;
}

export default SearchUserForm;
