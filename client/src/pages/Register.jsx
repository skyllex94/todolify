import React, { useEffect } from "react";
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

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    } else {
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
    }
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

          <div className="w-full p-8 lg:w-1/2">
            {enableAlert && <Alert type={alert.type} message={alert.message} />}

            {/* <a
              href="#!"
              className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className=" py-3">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <h1 className=" py-3 w-3/6 text-center text-gray-600 font-bold">
                Register with Google
              </h1>
            </a> */}
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
              <div className="mt-8">
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
