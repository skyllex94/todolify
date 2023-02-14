import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { saveUserId } from "../redux/authSlice";
import { decodeJWT } from "../utils/functions";

function Header() {
  const [userId, setUserId] = useState(null);
  const user_id = useSelector((state) => state.auth.user_id);
  const dispatch = useDispatch();
  const { logoutUser } = useLogout();
  const [toggleNav, setToggleNav] = useState(false);

  useEffect(() => {
    if (user_id) {
      setUserId(user_id);
    } else {
      const savedJWT = window.localStorage.getItem("jwt");
      if (savedJWT) {
        const user_id_obj = decodeJWT(savedJWT);
        const user_id = user_id_obj.user.id;
        setUserId(user_id);
        dispatch(saveUserId({ user_id }));
      }
    }
  }, [dispatch, user_id]);

  return (
    <div>
      <header>
        <nav
          className="absolute z-20 w-full flex items-center bg-white/90 dark:bg-gray-900/80 backdrop-blur  
        shadow-2xl shadow-gray-600/5 border-b dark:border-gray-800 
        peer-checked:navbar-active dark:shadow-snone"
        >
          <div className="xl:container md:container sm:container m-auto w-full md:px-12 lg:px-6">
            <div className="flex flex-wrap items-center justify-between justify-center gap-6 md:gap-0 pt-5 lg:py-5 md:py-5">
              <div className="w-full items-center flex justify-between lg:w-auto">
                <Link
                  to="/"
                  className="relative pl-2 z-20 dark:bg-gray-300"
                  aria-label="logo"
                >
                  Todolify
                </Link>
                <button
                  onClick={() => setToggleNav(!toggleNav)}
                  className="open-mobile-nav block relative z-20 px-6 py-3 cursor-pointer lg:hidden"
                >
                  <div
                    aria-hidden="true"
                    className="m-auto h-0.5 w-5 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"
                  />
                  <div
                    aria-hidden="false"
                    className="m-auto mt-2 h-0.5 w-5 rounded bg-gray-900 dark:bg-gray-300 transition 
                    duration-300"
                  />
                </button>
              </div>

              {toggleNav ? (
                <div
                  className="w-full mb-16 mx-4 mt-8 justify-end items-center space-y-8 p-6 border border-gray-100 
                  rounded-3xl shadow-2xl shadow-gray-300/20 bg-white dark:bg-gray-800 lg:space-y-0 lg:p-0 
                  lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none ark:shadow-none 
                  dark:border-gray-700 lg:border-0 menu relative"
                >
                  <div className="text-gray-600 dark:text-gray-300 lg:pr-4">
                    <ul className="space-y-6 font-medium text-base lg:text-sm lg:flex lg:space-y-0">
                      <li className="relative navlinks">
                        <Link
                          to={userId ? `/user/${userId}` : "/"}
                          className="md:px-4 lis dark:hover:text-primaryLight"
                        >
                          <span>Home</span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to={userId ? `/about` : "/"}
                          className="navlinks block md:px-4 transition hover:brackets hover:text-primary 
                          dark:hover:text-primaryLight"
                        >
                          <span>About</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="w-full space-y-2 flex items-center border-primary/10 dark:border-gray-700 
                    flex flex-col -lg:space-y-0"
                  >
                    {userId ? (
                      <button
                        onClick={logoutUser}
                        className="pl-3 relative flex h-9 ml-auto w-24 items-center justify-center 
                      sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-red-600 
                      dark:before:bg-red-400 before:transition before:duration-300 hover:before:scale-105 
                      active:duration-75 active:before:scale-95"
                      >
                        <span className="relative text-sm font-semibold text-white dark:text-gray-900">
                          Logout
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Link
                          to={userId ? `/user/${userId}` : "/register"}
                          className="relative flex border h-9 ml-auto items-center mr-3 w-24 justify-center
                          sm:px-6 before:absolute before:inset-0 rounded-full focus:before:bg-sky-600/10
                           dark:focus:before:bg-sky-400/10 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                        >
                          <span
                            className="relative flex w-24 ml-3 block text-sm font-semibold text-primary 
                          dark:text-primaryLight"
                          >
                            Register
                          </span>
                        </Link>
                        <Link
                          to={userId ? `/user/${userId}` : "/login"}
                          className="relative flex h-9 w-24 ml-auto items-center justify-center sm:px-6 
                          before:absolute before:inset-0 before:rounded-full before:bg-sky-600 
                          dark:before:bg-sky-400 before:transition before:duration-300 hover:before:scale-105 
                          active:duration-75 active:before:scale-95"
                        >
                          <span className="relative text-sm font-semibold text-white dark:text-gray-900">
                            Login
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="navmenu flex items-center justify-between">
                  <div className="text-gray-600 flex dark:text-gray-300 hidden lg:block lg:pr-4">
                    <ul className="space-y-6 font-medium text-base lg:text-sm lg:flex lg:space-y-0">
                      <li className="relative navlinks">
                        <Link
                          to={user_id ? `/user/${user_id}` : "/"}
                          className=" md:px-4 lis dark:hover:text-primaryLight hidden lg:block"
                        >
                          <span>Home</span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to={userId ? `/about` : "/"}
                          className="navlinks block md:px-4 transition hidden lg:block hover:brackets hover:text-primary dark:hover:text-primaryLight"
                        >
                          <span>About</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="w-full space-y-2 flex items-center border-primary/10 dark:border-gray-700 
                  flex flex-col -lg:space-y-0"
                  >
                    {userId ? (
                      <button
                        onClick={logoutUser}
                        className="pl-3 relative flex h-9 ml-auto w-24 hidden lg:block items-center justify-center 
                    sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-red-600 
                    dark:before:bg-red-400 before:transition before:duration-300 hover:before:scale-105 
                    active:duration-75 active:before:scale-95"
                      >
                        <span className="relative text-sm font-semibold text-white dark:text-gray-900">
                          Logout
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center">
                        <Link
                          to={userId ? `/user/${userId}` : "/register"}
                          className="relative flex border h-9 ml-auto items-center hidden lg:block mr-3 w-24 justify-center
                        sm:px-6 before:absolute before:inset-0 rounded-full focus:before:bg-sky-600/10
                         dark:focus:before:bg-sky-400/10 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                        >
                          <span
                            className="relative w-24 block mt-2 ml-2 flex text-sm font-semibold text-primary 
                        dark:text-primaryLight"
                          >
                            Register
                          </span>
                        </Link>
                        <Link
                          to={userId ? `/user/${userId}` : "/login"}
                          className="relative flex h-9 w-24 ml-auto pt-1.5 items-center justify-center sm:px-6 
                          before:absolute before:inset-0 before:rounded-full before:bg-sky-600 
                          dark:before:bg-sky-400 before:transition before:duration-300 hover:before:scale-105 
                          active:duration-75 active:before:scale-95 hidden lg:block"
                        >
                          <span className="relative text-sm font-semibold ml-2 text-white dark:text-gray-900">
                            Login
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
