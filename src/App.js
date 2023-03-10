import { useState, useEffect } from "react";

import "./App.css";
import { getTokenFromCookie } from "./common";
import UserWrapper from "./components/userWrapper/UserWrapper";

import { authCheck, getAllUsers } from "./utils";


function App() {

  const [user, setUser] = useState({ 
    username : null,
    email: null,
    token: null,
  });

  const [users, setUsers] = useState();

  useEffect(() => {
    if (document.cookie) {
      let token = getTokenFromCookie("jwt_token")

      if (token === false) {
        setUser({
          username: null,
          email: null,
          token: null,
        });
      } else {
        loginWithToken(token, setUser);
      }
    }
  }, [] );

  const logOut = (e) => {
    e.preventDefault()
    setUser({
      username: null,
      email: null,
      token: null,
    });

    setUsers(null);

    document.cookie = "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  const loginWithToken = async (token) => {
    const persistantUser = await authCheck(token);

    await setUser(persistantUser.user);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const cookieName = "jwt_token";
    setUsers(await getAllUsers(cookieName));
  };


  return (
    
    <div className="app-wrapper">
      <h1>Avesome app</h1>
      <UserWrapper user={user} setUser={setUser} />
      

      <>
      {user.token ? (
        <p>{user.username} is logged in</p>
      ) : (
        <p>not logged in</p>
      )} 
      </>

      <form onSubmit={(e) => submitHandler(e)}>

        <button type="submit">getAllUsers</button>
        <button onClick={(e) => logOut(e)} >Logout</button>
      </form>

      { users ? users.map((user) => <p key={user.id}> {user.username} </p>) : null }

    </div>
    
  );
}

export default App;
