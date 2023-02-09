import Header from "./Header";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getTodosAsync } from "../redux/todosSlice";
import { decodeJWT, getDate } from "../utils/functions";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import loader from "../assets/loader.gif";
import { useHorizontalScroll } from "../hooks/horizontalScroll";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";
import SideMenu from "../components/SideMenu/SideMenu";
import { saveUserData } from "../redux/dataSlice";

function Main() {
  const navigate = useNavigate();
  const savedJWT = window.localStorage.getItem("jwt");

  const user_id = decodeJWT(savedJWT);
  const { id } = user_id.user;

  const dispatch = useDispatch();
  // TODO: Make priorities on the tasks

  const [loadedTodoList, setLoadedTodoList] = useState(false);
  const [dateIdx, setDateIdx] = useState(0);
  const scrollRef = useHorizontalScroll();
  const [focusToday, setFocusToday] = useState(false);

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

  // URl change if coming from a different route
  // const urlValidation = () => {
  //   const currentUrl = window.location.href;
  //   const pathArray = currentUrl.split("/");
  //   const pathToCompare = pathArray.slice(3);
  //   if (pathToCompare[1] !== id) {
  //     const url = `/user/${id}`;
  //     window.history.pushState({}, "", url);
  //   }
  // };

  // Trigger async func on page load

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

    getUserTodoList(id).catch(console.error);
    // urlValidation();
  }, []);

  useEffect(() => {
    // If there's no JWT passed from App.js, navigate to landing page
    if (!id) navigate("/");
  }, [navigate, id]);

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

  return (
    <React.Fragment>
      <Header />

      <div className="flex h-screen">
        <SideMenu user_id={id} />

        <div
          className="flex pt-24 h-full"
          ref={scrollRef}
          style={{ overflow: "auto" }}
        >
          <div>
            <div className="flex mb-5">
              <div
                className={`${
                  focusToday ? "bg-white-400" : "bg-gray-200"
                } flex ml-5 relative items-center space-x-1 
              text-lg px-2 border hover:bg-red-100 text-gray-800 rounded-full`}
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
                  className="bg-gray-500 rounded-full mr-5"
                />
                <motion.div layout>
                  Week ({getWeek(dateIdx)} - {getWeek(dateIdx + 6)})
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
                className={`flex ml-5 relative ${
                  focusToday ? "bg-gray-200" : "bg-white-400"
                } 
          items-center space-x-1 text-lg px-2 text-gray-800 rounded-full hover:bg-red-100 border`}
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
                      console.log("categories:", categories);
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
                            if (curr.day === day && curr?.events.length > 0) {
                              events = curr.events;
                            }
                          });
                        }
                      });

                      return (
                        <TodoList
                          data={todos}
                          key={idx}
                          user_id={id}
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
                            if (curr.day === day && curr?.events.length > 0) {
                              events = curr.events;
                            }
                          });
                        }
                      });

                      return (
                        <TodoList
                          data={todos}
                          key={idx}
                          user_id={id}
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
