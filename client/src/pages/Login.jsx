import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

import LoginForm from "../components/forms/LoginForm";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJWT = JSON.parse(window.localStorage.getItem("jwt"));
    if (fetchJWT) navigate("/user/:id");
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="pt-40">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-l">
          <div className="w-full p-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
