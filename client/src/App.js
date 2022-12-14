import "./index.css";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { decodeJWT } from "./utils/functions";
import React from "react";

function App() {
  const savedJWT = window.localStorage.getItem("jwt");

  let user_id;
  if (savedJWT) {
    const payload = decodeJWT(savedJWT);
    user_id = payload.user.id;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing user_id={user_id} />} />
          <Route path={`/user/:id`} element={<Main user_id={user_id} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
