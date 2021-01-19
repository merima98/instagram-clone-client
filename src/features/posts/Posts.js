import React from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../state";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Posts() {
  const history = useHistory();
  async function onSubmit(values) {
    const token = null;
    history.push("/");
    setIsLoggedIn(false, token);
  }
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);

  return (
    <div style={{ padding: "60px" }}>
      <Header />
      <button onClick={onSubmit}>Log out</button>
      <Footer />
    </div>
  );
}

export default Posts;
