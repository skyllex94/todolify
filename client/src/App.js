import "./index.css";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import { decodeJWT } from "./utils/functions";
import React from "react";
import { useDispatch } from "react-redux";
import { saveUserId } from "./redux/authSlice";
import Goals from "./pages/Goals";
import Settings from "./components/Settings/Settings";
import About from "./pages/About";

import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const savedJWT = window.localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const googleClientID =
    "210618004548-d4nd5bsi5ofjbpq1lng1grj7gtupsbkc.apps.googleusercontent.com";

  let user_id;
  if (savedJWT) {
    const payload = decodeJWT(savedJWT);
    if (!payload) return user_id;

    user_id = payload.user.id;
    dispatch(saveUserId({ user_id }));
  }

  return (
    <GoogleOAuthProvider clientId={googleClientID}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path={`/user/:id`} element={<Main />} />
            <Route path={`/user/:id/new`} element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path={`/events/:id`} element={<Events />} />
            <Route path={`/goals/:id`} element={<Goals />} />
            <Route path={`/settings/:${user_id}`} element={<Settings />} />
            <Route path={"/about"} element={<About />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
