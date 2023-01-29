import "./index.css";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import { decodeJWT } from "./utils/functions";
import React from "react";

function App() {
  const savedJWT = window.localStorage.getItem("jwt");

  let user_id;
  if (savedJWT) {
    const payload = decodeJWT(savedJWT);
    user_id = payload.user.id;
  }

  // TODO: Fix link error
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path={`/user/:id`} element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path={`/events/:${user_id}`} element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
