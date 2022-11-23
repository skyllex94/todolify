import "./index.css";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
// Redux Store

import { useSelector } from "react-redux";

function App() {
  // Fetch JWT from redux store
  const jwt = useSelector((state) => state.auth.jwt);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/user" element={jwt ? <Main /> : <Login />} />
          <Route path="/login" element={jwt ? <Main /> : <Login />} />
          <Route path="/register" element={jwt ? <Main /> : <Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
