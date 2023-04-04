import axios from "axios";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDisplayAlert } from "../../hooks/useDisplayAlert";
import { useFormData } from "../../hooks/useFormData";

import { storeJWT, verifyRecaptcha } from "../../redux/authSlice";
import { decodeJWT } from "../../utils/functions";
import Alert from "../Alert/Alert";
import ReCAPTCHA from "react-google-recaptcha";
import { AnimatePresence } from "framer-motion";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formData, onChange } = useFormData();
  const { email, password } = formData;
  // Hangling and diplaying alert
  const { alertState, enableAlert, setEnableAlert, displayAlert } =
    useDisplayAlert();
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

    if (formData.email === "" || formData.password === "") {
      displayAlert("error", "Please input your credentials");
      return;
    }

    // if (verifiedRecaptcha === false) {
    //   displayAlert("error", "reCaptcha was not verified.");
    //   return;
    // }

    try {
      // Request to server to check if use exists in DB and send token
      const res = await axios.post("/api/user", formData);
      console.log("res:", res);

      // Take in the jwt returned from post req and set in redux store
      const jwt = dispatch(storeJWT({ jwt: res.data }));
      window.localStorage.setItem("jwt", JSON.stringify(jwt.payload.jwt.token));

      const user = decodeJWT(res.data.token);
      const { id } = user.user;
      navigate(`/user/${id}`);
    } catch (err) {
      displayAlert(err.name, err.message);
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
      <AnimatePresence>
        {enableAlert && (
          <Alert
            type={alertState.type}
            message={alertState.message}
            setEnableAlert={setEnableAlert}
          />
        )}
      </AnimatePresence>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mt-4 flex items-center justify-between">
          <span className="w-1/5 border-b lg:w-1/4" />

          <div className="mb-3">
            <h2 className="mt-4 text-center text-2xl font-semibold text-gray-700">
              Todolify
            </h2>
            <p className="text-center text-xl text-gray-600">Welcome back!</p>
          </div>
          <span className="w-1/5 border-b lg:w-1/4" />
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

        <div className="recaptcha mt-5 flex items-center justify-center">
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
            Login
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="w-1/5 border-b md:w-1/4" />
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
