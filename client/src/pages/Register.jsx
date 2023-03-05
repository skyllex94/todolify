import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
// HTTP Requests
import axios from "axios";
import image from "../assets/reg.jpg";
// Redux
import { useDispatch } from "react-redux";
import { storeJWT } from "../redux/authSlice";
import { decodeJWT } from "../utils/functions";
import Alert from "../components/Alert";

import { useDisplayAlert } from "../hooks/useDisplayAlert";
import { useSignupData } from "../hooks/useSignupData";
import ReCAPTCHA from "react-google-recaptcha";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [verifiedRecaptcha, setVerifiedRecaptcha] = useState(false);
  const { formData, onChange } = useSignupData();
  const { name, email, password, repeat_password } = formData;
  const { alert, enableAlert, displayAlert } = useDisplayAlert();

  useEffect(() => {
    const fetchJWT = JSON.parse(window.localStorage.getItem("jwt"));
    if (fetchJWT) navigate("/user/:id");
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeat_password) {
      displayAlert("error", "Passwords do not match");
      return;
    }

    if (verifiedRecaptcha === false) {
      displayAlert("error", "Please verify reCAPTCHA");
      return;
    }

    try {
      // Prepare body data, coming from formData
      const body = { name, email, password };
      // Making a promise - post request
      const res = await axios.post("/users", body);

      try {
        // Store the jsonwebtoken in redux store for route validation
        const jwt = dispatch(storeJWT({ jwt: res.data }));
        window.localStorage.setItem(
          "jwt",
          JSON.stringify(jwt.payload.jwt.token)
        );

        const user = decodeJWT(res.data.token);
        const { id } = user?.user;
        navigate(`/user/${id}/new`);
      } catch (err) {
        displayAlert(err.name, err.message, err.response.status);
      }
    } catch (err) {
      const errorArr = err.response.data.errors[0].msg;
      if (errorArr) {
        displayAlert(err.name, err.errorArr, err.response.status);
      }
      displayAlert(err.name, err.message, err.response.status);
    }
  };

  const recaptchaResult = async (token) => {
    console.log("token:", token);
    // const res = await axios.get(
    //   "http://localhost:3000/api/user/verify_recaptcha",
    //   {
    //     data: { token },
    //   }
    // );
    setVerifiedRecaptcha(true);
  };

  return (
    <div>
      <Header />
      <div className="pt-40">
        <div className="mx-auto flex max-w-sm overflow-hidden rounded-lg bg-white shadow-lg lg:max-w-4xl">
          <div className="mt-10 ml-6 flex hidden items-center justify-center bg-cover lg:block lg:w-1/2">
            <img
              src={image}
              alt="registration"
              className="h-110 w-full object-contain"
            />
          </div>

          <div className="w-full py-5 px-8 lg:w-1/2">
            {enableAlert && <Alert type={alert.type} message={alert.message} />}

            <div className="mt-4 flex items-center justify-between">
              <span className="w-1/8 border-b lg:w-1/6"></span>
              <div>
                <h2 className="text-center text-2xl font-semibold text-gray-700">
                  Todolify
                </h2>
                <div className="mt-2 text-center">
                  <p>Your personalized todo app</p>
                </div>
              </div>

              <span className="w-1/8 border-b lg:w-1/6"></span>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Full Name
                </label>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e, "name")}
                  className="focus:shadow-outline block w-full appearance-none 
                    rounded border border-gray-300 bg-gray-100 py-2 px-4 text-gray-800 
                    hover:bg-white focus:outline-none"
                  type="text"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Email Address
                </label>
                <input
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e, "email")}
                  className="focus:shadow-outline block w-full appearance-none 
                    rounded border border-gray-300 bg-gray-100 py-2 px-4 text-gray-800 
                    hover:bg-white focus:outline-none"
                  type="email"
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Password
                  </label>
                </div>
                <input
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e, "password")}
                  className="focus:shadow-outline block w-full appearance-none 
                    rounded border border-gray-300 bg-gray-100 py-2 px-4 text-gray-800 
                    hover:bg-white focus:outline-none"
                  type="password"
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="repeat_password"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Repeat Password
                  </label>
                </div>
                <input
                  name="repeat_password"
                  value={repeat_password}
                  onChange={(e) => onChange(e, "repeat_password")}
                  className="focus:shadow-outline block w-full appearance-none 
                    rounded border border-gray-300 bg-gray-100 py-2 px-4 text-gray-800 
                    hover:bg-white focus:outline-none"
                  type="password"
                />
              </div>

              <div className="mt-5 flex items-center justify-center">
                <ReCAPTCHA
                  sitekey="6Lf4-9QkAAAAAJtMG1ZtBwzeo0FEMUFeNKQfhsJo"
                  onChange={recaptchaResult}
                />
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full rounded bg-gray-700 py-2 px-4 font-bold text-white hover:bg-gray-600"
                >
                  Create an account
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center justify-between">
              <span className="w-1/5 border-b md:w-1/4"></span>
              <Link to="/login" className="text-xs uppercase text-gray-500">
                or Login instead
              </Link>
              <span className="w-1/5 border-b md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
