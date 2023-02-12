import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./sidemenu.module.css";
import { FiSettings } from "react-icons/fi";
import { BsCalendar3Week } from "react-icons/bs";
import {
  MdOutlineBeenhere,
  MdOutlineDoubleArrow,
  MdOutlineViewWeek,
} from "react-icons/md";
import { GiCornerFlag } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { openSideMenu } from "../../redux/settingsSlice";

function SideMenu({ user_id }) {
  // Side Menu states
  const isOpen = useSelector((state) => state.settings.isOpenSideMenu);
  const navLinks = [
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
      link: `/goals/${user_id}`,
      icon: <GiCornerFlag size={"24"} />,
    },
    {
      name: "Settings",
      link: `/settings/${user_id}`,
      icon: <FiSettings size={"24"} />,
    },
  ];

  const dispatch = useDispatch();
  const toggleOpen = () => dispatch(openSideMenu(!isOpen));

  // Default motion style props for usage
  const motionProps = {
    initial: { scale: 1 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  };

  return (
    <div className={isOpen ? styles.sidenav : styles.sidenavClosed}>
      <button className={styles.menuBtn} onClick={toggleOpen}>
        {isOpen ? (
          <MdOutlineDoubleArrow
            size={24}
            style={{ transform: "rotate(180deg)", textAlign: "right" }}
          />
        ) : (
          <MdOutlineDoubleArrow size={24} />
        )}
      </button>
      <div className="space-y-3">
        <div className="flex items-center">
          <h2 className={isOpen ? "text-xl font-bold" : "hidden"}>Dashboard</h2>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} className="relative">
          <div className={isOpen ? "text-xl" : "hidden"}>
            <span className="absolute inset-y-0 left-0 flex items-center">
              <button
                type="submit"
                className="p-2 focus:outline-none focus:ring"
              ></button>
            </span>
            <input
              type="search"
              name="Search"
              placeholder="Search Task..."
              className="text-sm mr-5 rounded-md focus:outline-none"
            />
          </div>
        </motion.div>
        <div className={!isOpen && "hidden xl:block lg:block md:block"}>
          <ul className="pt-2 pb-4 space-y-1 text-s">
            {navLinks.map((curr, idx) => {
              return (
                <motion.li key={idx} {...motionProps} className="rounded-sm ">
                  <Link
                    to={curr.link}
                    className={"flex items-center p-2 space-x-3 rounded-md"}
                  >
                    <span>{curr.icon}</span>
                    <span className={isOpen ? "" : "hidden"}>{curr.name}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
