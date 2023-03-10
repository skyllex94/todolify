import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDisplayAlert } from "../../hooks/useDisplayAlert";
import { useFormData } from "../../hooks/useFormData";

import { storeJWT, verifyRecaptcha } from "../../redux/authSlice";
import { decodeJWT } from "../../utils/functions";
import Alert from "../Alert";
import ReCAPTCHA from "react-google-recaptcha";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recaptchaRef = useRef();

  useEffect(() => {
    recaptchaRef.current.reset();
  }, []);

  const { formData, onChange } = useFormData();
  const { email, password } = formData;
  // Hangling and diplaying alert
  const { alert, enableAlert, displayAlert } = useDisplayAlert();
  const [verifiedRecaptcha, setVerifiedRecaptcha] = useState(false);

  // Google OAuth startup
  // useEffect(() => {
  //   // console.log(process.env.GOOGLE_CLIENT_ID);
  //   /*  global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       "210618004548-3hri404l5rvk77q0v4800vedav2ntonc.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById("google-signin-button"),
  //     { theme: "outline", size: "large" }
  //   );
  // }, []);

  // function handleCallbackResponse(res) {
  //   const google_user_data = jwt_decode(res.credential);
  //   console.log("google_user_data:", google_user_data);
  // }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (verifiedRecaptcha === false) {
      displayAlert("error", "reCaptcha was not verified.");
      return;
    }
    try {
      // Request to server to check if use exists in DB and send token
      const res = await axios.post("/api/user", formData);

      // Take in the jwt returned from post req and set in redux store
      const jwt = dispatch(storeJWT({ jwt: res.data }));
      window.localStorage.setItem("jwt", JSON.stringify(jwt.payload.jwt.token));

      const user = decodeJWT(res.data.token);
      const { id } = user.user;
      navigate(`/user/${id}`);
    } catch (err) {
      displayAlert(err.name, err.message, err.response.status);
    }
  };

  const recaptchaResult = async (token) => {
    const res = await dispatch(verifyRecaptcha(token));

    if (res.error) {
      displayAlert("error", res.error);
      return;
    }
    if (res.verificationResult === false) return;
    setVerifiedRecaptcha(true);
  };

  return (
    <Fragment>
      {enableAlert && <Alert type={alert.type} message={alert.message} />}

      <form onSubmit={(e) => onSubmit(e)}>
        {/* <a
          href="#!"
          className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md
           hover:bg-gray-100"
        >
          <div className="px-4 py-3">
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
          <div
            id="google-signin-button"
            className="px-4 py-3 w-5/6 text-center text-gray-600 
          font-bold"
          >
            Sign in with Google
          </div>
        </a> */}
        <div className="mt-4 flex items-center justify-between">
          <span className="w-1/5 border-b lg:w-1/4"></span>

          <div className="mb-3">
            <h2 className="mt-4 text-center text-2xl font-semibold text-gray-700">
              Todolify
            </h2>
            <p className="text-center text-xl text-gray-600">Welcome back!</p>
          </div>
          <span className="w-1/5 border-b lg:w-1/4"></span>
        </div>
        <div className="mt-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            alt="email"
            value={email}
            onChange={(e) => onChange(e, "email")}
            className="focus:shadow-outline block w-full rounded 
            border border-gray-300 bg-gray-100 py-2 px-4 text-gray-800 hover:bg-white focus:outline-none"
          />
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Password
            </label>
            <a href="#!" className="text-xs text-gray-500">
              Forget Password?
            </a>
          </div>
          <input
            type="password"
            alt="password"
            value={password}
            onChange={(e) => onChange(e, "password")}
            className="focus:shadow-outline block w-full rounded 
            border border-gray-300 bg-gray-100 py-2 px-4 text-gray-800 hover:bg-white focus:outline-none"
          />
        </div>
        <div className="mt-5 flex items-center justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Lf4-9QkAAAAAJtMG1ZtBwzeo0FEMUFeNKQfhsJo"
            onChange={recaptchaResult}
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="w-full rounded bg-gray-700 py-2 px-4 font-bold text-white hover:bg-gray-600"
          >
            Login
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="w-1/5 border-b md:w-1/4"></span>
          <Link to="/register" className="text-xs uppercase text-gray-500">
            or sign up
          </Link>
          <span className="w-1/5 border-b md:w-1/4"></span>
        </div>
      </form>
    </Fragment>
  );
}

export default LoginForm;
