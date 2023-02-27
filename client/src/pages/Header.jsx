import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { saveUserId } from "../redux/authSlice";
import { decodeJWT } from "../utils/functions";
import logo from "../assets/brackets.png";

function Header() {
  const [userId, setUserId] = useState(null);
  const user_id = useSelector((state) => state.auth.user_id);
  const dispatch = useDispatch();
  const { logoutUser } = useLogout();
  const [toggleNav, setToggleNav] = useState(false);

  // Hide mobile menu when click away from it
  const mobileMenuRef = useRef();

  const closeOpenMenus = useCallback(
    (e) => {
      if (
        mobileMenuRef.current &&
        toggleNav &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setToggleNav(false);
      }
    },
    [toggleNav]
  );

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
  }, [closeOpenMenus]);

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
      <header ref={mobileMenuRef}>
        <nav
          className="peer-checked:navbar-active dark:shadow-snone absolute z-20 flex w-full items-center border-b  
        bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur 
        dark:border-gray-800 dark:bg-gray-900/80"
        >
          <div className="m-auto w-full sm:container md:container md:px-12 lg:px-6 xl:container">
            <div className="flex flex-wrap items-center justify-between gap-6 pt-5 md:gap-0 md:py-5 lg:py-5">
              <div className="flex w-full items-center justify-between lg:w-auto">
                <Link
                  to="/"
                  className="relative z-20 flex items-center pl-2 dark:bg-gray-300"
                  aria-label="logo"
                >
                  <img className="mr-3 w-6" src={logo} alt="Logo" />

                  <p className="text-xl font-medium leading-tight">
                    <b>Todolify</b>
                  </p>
                </Link>
                <button
                  onClick={() => setToggleNav(!toggleNav)}
                  className="open-mobile-nav relative z-20 block cursor-pointer px-6 py-3 lg:hidden"
                >
                  <div
                    aria-hidden="true"
                    className="m-auto h-0.5 w-5 rounded bg-gray-900 transition duration-300 dark:bg-gray-300"
                  />
                  <div
                    aria-hidden="false"
                    className="m-auto mt-2 h-0.5 w-5 rounded bg-gray-900 transition duration-300 
                    dark:bg-gray-300"
                  />
                </button>
              </div>

              {toggleNav ? (
                <div
                  className="ark:shadow-none menu relative mx-4 mb-16 mt-8 w-full items-center justify-end space-y-8 
                  rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-300/20 
                  dark:border-gray-700 dark:bg-gray-800 md:flex-nowrap lg:m-0 lg:flex lg:w-7/12 lg:space-y-0 
                  lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
                >
                  <div className="text-gray-600 dark:text-gray-300 lg:pr-4">
                    <ul className="space-y-6 text-base font-medium lg:flex lg:space-y-0 lg:text-sm">
                      <li className="navlinks relative">
                        <Link
                          to={userId ? `/user/${userId}` : "/"}
                          className="lis dark:hover:text-primaryLight md:px-4"
                        >
                          <span>Home</span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to={"/about"}
                          className="navlinks hover:brackets hover:text-primary dark:hover:text-primaryLight block transition 
                          md:px-4"
                        >
                          <span>About</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="border-primary/10 -lg:space-y-0 flex w-full flex-col 
                    items-center space-y-2 dark:border-gray-700"
                  >
                    {userId ? (
                      <button
                        onClick={logoutUser}
                        className="relative ml-auto flex h-9 w-24 items-center justify-center 
                      before:absolute before:inset-0 before:rounded-full before:bg-red-600 before:transition 
                      before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 
                      dark:before:bg-red-400 sm:px-6"
                      >
                        <span className="relative text-sm font-semibold text-white dark:text-gray-900">
                          Logout
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Link
                          to={userId ? `/user/${userId}` : "/register"}
                          className="relative ml-auto mr-3 flex h-9 w-24 justify-center rounded-full border
                           pt-2 before:absolute before:inset-0 before:transition
                           before:duration-300 hover:before:scale-105 focus:before:bg-sky-600/10 
                           active:duration-75 active:before:scale-95 dark:focus:before:bg-sky-400/10"
                        >
                          <span
                            className="text-primary dark:text-primaryLight relative ml-6 block flex w-24 text-sm 
                          font-semibold"
                          >
                            Sign up
                          </span>
                        </Link>
                        <Link
                          to={userId ? `/user/${userId}` : "/login"}
                          className="relative ml-auto flex h-9 w-24 items-center justify-center pl-3 
                          before:absolute before:inset-0 before:rounded-full before:bg-red-600 before:transition 
                          before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 
                          dark:before:bg-red-400 sm:px-6"
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
                  <div className="flex hidden text-gray-600 dark:text-gray-300 lg:block lg:pr-4">
                    <ul className="space-y-6 text-base font-medium lg:flex lg:space-y-0 lg:text-sm">
                      <li className="navlinks relative">
                        <Link
                          to={user_id ? `/user/${user_id}` : "/"}
                          className="lis hidden md:px-4 lg:block"
                        >
                          <span>Home</span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to={"/about"}
                          className="navlinks hover:brackets hover:text-primary dark:hover:text-primaryLight block hidden transition md:px-4 lg:block"
                        >
                          <span>About</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="border-primary/10 -lg:space-y-0 flex flex 
                  flex-col items-center dark:border-gray-700"
                  >
                    {userId ? (
                      <button
                        onClick={logoutUser}
                        className="relative ml-auto flex hidden h-9 w-24 items-center justify-center pl-3 before:absolute 
                      before:inset-0 before:rounded-full before:bg-red-600 before:transition before:duration-300 
                      hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:bg-red-400 
                      sm:px-6 lg:block"
                      >
                        <span className="relative text-sm font-semibold text-white dark:text-gray-900">
                          Logout
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center">
                        <Link
                          to={userId ? `/user/${userId}` : "/register"}
                          className="relative ml-auto mr-3 flex hidden h-9 w-24 items-center justify-center rounded-full border
                        before:absolute before:inset-0 before:transition before:duration-300 hover:before:scale-105
                         focus:before:bg-sky-600/10 active:duration-75 active:before:scale-95 dark:focus:before:bg-sky-400/10 sm:px-6 lg:block"
                        >
                          <span
                            className="text-primary dark:text-primaryLight relative mt-2 block flex w-24 text-sm 
                        font-semibold"
                          >
                            Sign up
                          </span>
                        </Link>
                        <Link
                          to={userId ? `/user/${userId}` : "/login"}
                          className="relative ml-auto flex hidden h-9 w-24 items-center justify-center pt-1.5 
                          before:absolute before:inset-0 before:rounded-full before:bg-red-600 
                          before:transition before:duration-300 hover:before:scale-105 active:duration-75 
                          active:before:scale-95 dark:before:bg-red-400 sm:px-6 lg:block"
                        >
                          <span className="relative ml-2 text-sm font-semibold text-white dark:text-gray-900">
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
