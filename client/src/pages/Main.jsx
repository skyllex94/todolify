import Header from "./Header";
import TodoList from "../components/WeeklyList/TodoList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getTodosAsync } from "../redux/todosSlice";
import { getDate } from "../utils/functions";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import loader from "../assets/loader.gif";
import { useHorizontalScroll } from "../hooks/horizontalScroll";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";
import SideMenu from "../components/SideMenu/SideMenu";
import { saveUserData } from "../redux/dataSlice";
// var _ = require("lodash");

function Main() {
  const navigate = useNavigate();
  const user_id = useSelector((state) => state.auth.user_id);

  const [loadedTodoList, setLoadedTodoList] = useState(false);
  const [dateIdx, setDateIdx] = useState(0);
  const scrollRef = useHorizontalScroll();
  const [focusToday, setFocusToday] = useState(false);

  const dispatch = useDispatch();

  function handleShowInstModal() {
    if (document.URL.toString().includes("/new")) return true;
    return true;
  }

  const showEventsInTodoList = useSelector(
    (state) => state.settings.showEventsInTodoList
  );

  // Redux state for todo list of auth user
  const todoList = useSelector((state) => state.todos);

  const week = [
    todoList,
    todoList,
    todoList,
    todoList,
    todoList,
    todoList,
    todoList,
  ];

  const weeklyTodoList = week;

  useEffect(() => {
    // Async function triggered when page loaded to call a GET request
    // to specific user & fetch the todoList object of that user
    const getUserTodoList = async (id) => {
      // Trigger async GET request to the server, who fetch the data from MongoDB
      // Use await to get a response obj and compare the result in order to remove loader
      // and load all the data set since fetched in Redux if it does pass it
      const respFromDB = await dispatch(getTodosAsync(id));

      if (respFromDB.type === "getTodosAsync/fulfilled") {
        // Save the user data locally after being loaded
        dispatch(saveUserData(respFromDB.payload));
        setLoadedTodoList(true);
      }
      return respFromDB;
    };

    getUserTodoList(user_id).catch(console.error);
  }, [user_id, dispatch]);

  useEffect(() => {
    // If there's no JWT passed from App.js, navigate to landing page
    if (!user_id) navigate("/");
  }, [navigate, user_id]);

  function getWeek(idx) {
    const date = getDate(idx);
    return date.day + "/" + date.month_year;
  }

  const loadPreviousWeek = () => {
    setDateIdx(dateIdx - 7);
  };

  const loadNexWeek = () => {
    setDateIdx(dateIdx + 7);
  };

  const toggleFocusOnToday = () => {
    setFocusToday(!focusToday);
  };

  // const result = _.filter(todoList.date, {
  //   month_year: "02/2023",
  //   days: [{ day: 10 }],
  // });

  // const query = () => {
  //   const result = _.filter(todoList.date, {
  //     days: [{ categories: [{ tasks: [{ task: "Kamen" }] }] }],
  //   }).map((filtered) => filtered.days);
  //   console.log("result:", result);
  // };

  return (
    <React.Fragment>
      <Header />

      <div className="flex h-screen">
        <SideMenu />

        <div
          className="flex h-full pt-24"
          ref={scrollRef}
          style={{ overflow: "auto" }}
        >
          <div>
            <div className="mb-5 flex">
              <div
                className={`${
                  focusToday ? "bg-white-400" : "block bg-gray-200"
                } relative ml-7 flex items-center space-x-1 rounded-full border px-2 
              text-lg text-gray-800 hover:bg-red-100 `} //sm:ml-5 md:ml-5 lg:ml-5
              >
                <motion.button
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="pr-5"
                  disabled={focusToday ? true : false}
                  onClick={loadPreviousWeek}
                >
                  <AiOutlineArrowLeft />
                </motion.button>

                <div
                  style={{ width: "0.4rem", height: "0.4rem" }}
                  className={`mr-5 rounded-full bg-gray-500`}
                />
                <motion.div
                  layout
                  className={` ${
                    focusToday
                      ? `mr-5 hidden rounded-full bg-gray-500`
                      : `block`
                  } `}
                >
                  {getWeek(dateIdx)} - {getWeek(dateIdx + 6)}
                </motion.div>

                <motion.button
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="pl-5"
                  disabled={focusToday ? true : false}
                  onClick={loadNexWeek}
                >
                  <AiOutlineArrowRight />
                </motion.button>
              </div>

              <div
                className={`relative ml-5 flex ${
                  focusToday ? "bg-gray-200" : "bg-white-400"
                } 
          items-center space-x-1 rounded-full border px-2 text-lg text-gray-800 hover:bg-red-100`}
              >
                <motion.button
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className={"px-3"}
                  onClick={toggleFocusOnToday}
                >
                  Focus on Today
                </motion.button>
                {/* <button onClick={query}>Query</button> */}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                // Key value is the indication for the Framer to start the animation
                key={dateIdx}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -700, opacity: 0 }}
                className="flex"
              >
                {loadedTodoList ? (
                  focusToday ? (
                    [todoList].map((todos, idx) => {
                      const date = getDate(0);
                      const { day, month_year, dayOfWeek } = date;
                      let categories = todos.categories;
                      let events = null;
                      let dayWtData = false;

                      todos.date.map((currDate) => {
                        if (currDate.month_year === month_year) {
                          currDate.days.map((curr) => {
                            if (
                              curr.day === day &&
                              curr?.categories.length > 0
                            ) {
                              dayWtData = true;
                              categories = curr.categories;
                            }
                            if (
                              showEventsInTodoList &&
                              curr.day === day &&
                              curr?.events.length > 0
                            ) {
                              events = curr.events;
                            }
                          });
                        }
                      });

                      return (
                        <TodoList
                          data={todos}
                          key={idx}
                          user_id={user_id}
                          todos={categories}
                          events={events}
                          day={day}
                          month_year={month_year}
                          dayOfWeek={dayOfWeek}
                          dayWtData={dayWtData}
                        />
                      );
                    })
                  ) : (
                    weeklyTodoList.map((todos, idx) => {
                      const date = getDate(dateIdx + idx);
                      const { day, month_year, dayOfWeek } = date;
                      let categories = todos.categories;
                      let events = null;
                      let dayWtData = false;

                      todos.date.map((currDate) => {
                        if (currDate.month_year === month_year) {
                          currDate.days.map((curr) => {
                            if (
                              curr.day === day &&
                              curr?.categories.length > 0
                            ) {
                              dayWtData = true;
                              categories = curr.categories;
                            }
                            if (
                              showEventsInTodoList &&
                              curr.day === day &&
                              curr?.events.length > 0
                            ) {
                              events = curr.events;
                            }
                          });
                        }
                      });

                      return (
                        <TodoList
                          data={todos}
                          key={idx}
                          user_id={user_id}
                          todos={categories}
                          events={events}
                          day={day}
                          month_year={month_year}
                          dayOfWeek={dayOfWeek}
                          dayWtData={dayWtData}
                        />
                      );
                    })
                  )
                ) : (
                  <div>
                    <img src={loader} className="loader" alt="loader" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Main;
