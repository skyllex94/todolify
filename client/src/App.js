import "./index.css";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { decodeJWT } from "./utils/functions";
// Redux Store

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
          <Route
            path={`/user/:id`}
            element={savedJWT ? <Main user_id={user_id} /> : <Login />}
          />
          <Route
            path="/login"
            element={savedJWT ? <Main user_id={user_id} /> : <Login />}
          />
          <Route
            path="/register"
            element={savedJWT ? <Main user_id={user_id} /> : <Register />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
