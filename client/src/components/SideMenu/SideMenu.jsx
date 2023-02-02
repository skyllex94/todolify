import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./sidemenu.modules.css";
import { FiArrowDownLeft, FiArrowDownRight, FiSettings } from "react-icons/fi";
import { BsCalendar3Week } from "react-icons/bs";
import { MdOutlineBeenhere, MdOutlineViewWeek } from "react-icons/md";
import { GiCornerFlag } from "react-icons/gi";

function SideMenu(user_id) {
  // Side Menu states
  const [open, setopen] = useState(true);
  const toggleOpen = () => {
    console.log(open);
    setopen((prev) => !prev);
  };
  const navLinks = [
    {
      name: "Today List",
      link: "/",
      icon: <MdOutlineBeenhere size={"24"} />,
    },
    {
      name: "Weekly List",
      link: `/user/${user_id}`,
      icon: <MdOutlineViewWeek size={"24"} />,
    },
    {
      name: "Events",
      link: `/events/${user_id}`,
      icon: <BsCalendar3Week size={"24"} />,
    },
    {
      name: "Yearly Goals",
      link: "/",
      icon: <GiCornerFlag size={"24"} />,
    },
    {
      name: "Settings",
      link: "/",
      icon: <FiSettings size={"24"} />,
    },
  ];

  // Default motion style props for usage
  const motionProps = {
    initial: { scale: 1 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  };
  // Start Here: Deal with sticky menu

  // TODO: Stick the side menu to be locked on the left
  //min-w-[15%]

  return (
    <div className={open ? styles.sidenav : styles.sidenavClosed}>
      <button className={styles.menuBtn} onClick={toggleOpen}>
        {open ? <FiArrowDownLeft /> : <FiArrowDownRight />}
      </button>
      <div className="space-y-3">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
          className="relative"
        >
          <span className="absolute inset-y-0 left-0 flex items-center py-4">
            <button type="submit" className="p-2 focus:outline-none focus:ring">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search Task..."
            className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
          />
        </motion.div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {navLinks.map((curr) => {
              return (
                <motion.li {...motionProps} className="rounded-sm">
                  <Link
                    to={curr.link}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <span>{curr.icon}</span>
                    <span>{curr.name}</span>
                  </Link>
                </motion.li>
              );
            })}

            {/* <motion.li {...motionProps} className="rounded-sm">
              <a
                href="#!"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Today List</span>
              </a>
            </motion.li>
            <motion.li {...motionProps} className="rounded-sm">
              <Link
                to={`/user/${user_id}`}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <span>Weekly List</span>
              </Link>
            </motion.li>
            <motion.li {...motionProps} className="rounded-sm">
              <Link
                to={{
                  pathname: `/events/${user_id}`,
                  state: { fromDashboard: true },
                }}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span>Events</span>
              </Link>
            </motion.li>
            <motion.li {...motionProps} className="rounded-sm">
              <a
                href="#!"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Settings</span>
              </a>
            </motion.li>
            <motion.li {...motionProps} className="rounded-sm">
              <a
                href="#!"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </a>
            </motion.li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
