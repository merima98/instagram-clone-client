import React from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../state";

function Posts() {
  const history = useHistory();
  async function onSubmit(values) {
    const token = null;
    history.push("/");
    setIsLoggedIn(false, token);
  }
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);

  return (
    <div>
      <button onClick={onSubmit}>Log out</button>
    </div>
  );
}

export default Posts;