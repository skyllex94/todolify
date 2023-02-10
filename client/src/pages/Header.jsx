import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { decodeJWT } from "../utils/functions";

function Header() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedJWT = window.localStorage.getItem("jwt");
    if (savedJWT) {
      const user_id = decodeJWT(savedJWT);
      setUserId(user_id.user.id);
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("jwt");
    if (window.location.pathname === "/") window.location.reload(false);
    navigate("/");
  };

  return (
    <div>
      <header>
        <nav className="absolute z-20 w-full bg-white/90 dark:bg-gray-900/80 backdrop-blur navbar shadow-2xl shadow-gray-600/5 border-b border-gray-100 dark:border-gray-800 peer-checked:navbar-active dark:shadow-snone">
          <div className="xl:container m-auto px-6 md:px-12 lg:px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 md:gap-0 md:py-5">
              <div className="w-full items-center flex justify-between lg:w-auto">
                <Link
                  to="/"
                  className="relative z-20 dark:bg-gray-300 "
                  href="#!"
                  aria-label="logo"
                >
                  Todolify
                </Link>
                <label
                  htmlFor="hbr"
                  className="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden"
                >
                  <div
                    aria-hidden="true"
                    className="m-auto h-0.5 w-5 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"
                  />
                  <div
                    aria-hidden="true"
                    className="m-auto mt-2 h-0.5 w-5 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"
                  />
                </label>
              </div>
              <div className="navmenu relative w-full flex-wrap mb-16 justify-end items-center space-y-8 p-6 border border-gray-100 rounded-3xl shadow-2xl shadow-gray-300/20 bg-white dark:bg-gray-800 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none dark:shadow-none dark:border-gray-700 lg:border-0">
                <div className="text-gray-600 dark:text-gray-300 lg:pr-4">
                  <ul className="space-y-6 font-medium text-base lg:text-sm lg:flex lg:space-y-0">
                    <li className="relative navlinks">
                      <Link
                        to={userId ? `/user/${userId}` : "/"}
                        className=" md:px-4 lis dark:hover:text-primaryLight"
                      >
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={userId ? `/user/${userId}` : "/"}
                        className="navlinks md:px-4 transition hover:text-primary dark:hover:text-primaryLight"
                      >
                        <span>Portfolio</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={userId ? `/user/${userId}` : "/"}
                        className="navlinks block md:px-4 transition hover:brackets hover:text-primary dark:hover:text-primaryLight"
                      >
                        <span>Services</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="w-full space-y-2 border-primary/10 dark:border-gray-700 flex flex-col -ml-1 sm:flex-row lg:space-y-0 md:w-max">
                  {userId ? (
                    <button
                      onClick={logoutUser}
                      className="pl-3 relative flex h-9 ml-auto items-center justify-center 
                      sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-red-600 
                      dark:before:bg-red-400 before:transition before:duration-300 hover:before:scale-105 
                      active:duration-75 active:before:scale-95"
                    >
                      <span className="relative text-sm font-semibold text-white dark:text-gray-900">
                        Logout
                      </span>
                    </button>
                  ) : (
                    <React.Fragment>
                      <Link
                        to={userId ? `/user/${userId}` : "/register"}
                        className="relative flex h-9 ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full focus:before:bg-sky-600/10 dark:focus:before:bg-sky-400/10 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                      >
                        <span className="relative text-sm font-semibold text-primary dark:text-primaryLight">
                          Sign Up
                        </span>
                      </Link>
                      <Link
                        to={userId ? `/user/${userId}` : "/login"}
                        className="relative flex h-9 ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-sky-600 dark:before:bg-sky-400 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                      >
                        <span className="relative text-sm font-semibold text-white dark:text-gray-900">
                          Login
                        </span>
                      </Link>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
