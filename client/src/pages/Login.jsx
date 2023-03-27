import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import LoginForm from "../components/Form/LoginForm";

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
        <div className="lg:max-w-l mx-auto flex max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="w-full p-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
