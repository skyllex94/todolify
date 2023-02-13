import React, { useState } from "react";
import landingImage from "../assets/landing-image.png";
import { RiLinkUnlinkM } from "react-icons/ri";
import { MdOutlineManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
import { decodeJWT } from "../utils/functions";

function Landing() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const savedJWT = window.localStorage.getItem("jwt");
    if (savedJWT) {
      const user_id = decodeJWT(savedJWT);
      setUserId(user_id.user.id);
    } else setUserId(null);
  }, []);

  return (
    <div>
      <Header />
      <div className="bg-white relative pt-40 pb-20 lg:pt-44 dark:bg-gray-900">
        <div className="relative xl:container m-auto px-6 md:px-12 lg:px-6">
          <h1 className="sm:mx-auto sm:w-10/12 md:w-2/3 font-black text-red-900 text-4xl text-center sm:text-5xl md:text-6xl lg:w-auto lg:text-left xl:text-7xl">
            Want to be 30% more productive?
            <br className="lg:block hidden" />{" "}
            <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-red-700 to-orange-500 dark:from-red-400 dark:to-red-300">
              Try our timeblock & categorization to-do list
            </span>
            .
          </h1>
          <div className="lg:flex">
            <div className="relative mt-8 md:mt-16 space-y-8 sm:w-10/12 md:w-2/3 lg:ml-0 sm:mx-auto text-center lg:text-left lg:mr-auto lg:w-7/12">
              <p className="sm:text-lg text-gray-700 dark:text-gray-300 lg:w-9/12">
                The most effective way to get things done is <b>focusing</b> on
                single tasks, that's why time blocking works. When you pair this
                with putting category on what you want to focus and place your
                task inside, you will be able to further improve your efficiency
                and productivity. Separate your day in singular categories and
                tackle them at a set time frame <b>completely for free.</b>
              </p>
              <span className="block font-semibold text-gray-500 dark:text-gray-400">
                Your daily companion when you want to get sh*t done.
              </span>
              <div className="grid gap-2 md:space-x-6 md:flex md:justify-center lg:justify-start">
                <Link
                  to={userId ? `user/${userId}` : "/login"}
                  className="p-4 block border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-full duration-300 hover:border-red-400 hover:shadow-lg hover:shadow-red-600/20 dark:hover:border-red-300/30"
                >
                  <div className="flex justify-center space-x-3 ">
                    <RiLinkUnlinkM className="mt-0.5" />
                    <span className="font-medium md:block dark:text-white">
                      Get started
                    </span>
                  </div>
                </Link>
                <Link
                  to={userId ? `user/${userId}` : "/register"}
                  className="p-4 border border-gray-200 dark:bg-gray-800  dark:border-gray-700 rounded-full duration-300 hover:border-green-400 hover:shadow-lg hover:shadow-lime-600/20 dark:hover:border-green-300/30"
                >
                  <div className="flex justify-center space-x-4">
                    <MdOutlineManageAccounts className="mt-0.5" />
                    <span className="font-medium md:block dark:text-white">
                      Create an Account
                    </span>
                  </div>
                </Link>
              </div>

              <div className="dark:text-gray-300  font-semibold">
                🔥🌟
                <span className="pl-2">
                  Secure encryption without a need for registration.
                </span>
              </div>
            </div>
            <div className="mt-12 md:mt-0 lg:absolute -right-10 lg:w-7/12">
              <div className="relative w-full">
                <div
                  aria-hidden="true"
                  className="absolute scale-75 md:scale-110 inset-0 m-auto w-full h-full md:w-96 md:h-96 
                  rounded-full rotate-45 bg-gradient-to-r from-red-500 to-orange-300 blur-3xl"
                />
                <img
                  src={landingImage}
                  className="relative w-full mt-6"
                  alt="wath illustration"
                  loading="lazy"
                  width="320"
                  height="280"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
