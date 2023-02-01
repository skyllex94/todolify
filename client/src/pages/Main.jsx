import Header from "./Header";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTodosAsync } from "../redux/todosSlice";
import { decodeJWT, getDate } from "../utils/functions";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import loader from "../assets/loader.gif";
import { useHorizontalScroll } from "../hooks/horizontalScroll";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";
import SideMenu from "../components/SideMenu";

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

  // Redux state for todo list of auth user
  const todoList = useSelector((state) => state.todos);
  const weeklyTodoList = [
    todoList,
    todoList,
    todoList,
    todoList,
    todoList,
    todoList,
    todoList,
  ];

  // // URl change if coming from a different route
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
        setLoadedTodoList(true);
      }
    };

    getUserTodoList(id).catch(console.error);
    // urlValidation();
  }, [dispatch, id]);

  useEffect(() => {
    // If there's no JWT passed from App.js, then navigate back to landing page
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

  return (
    <div className="h-screen">
      <Header />

      <div
        className="flex pt-24 h-full"
        ref={scrollRef}
        style={{ overflow: "auto" }}
      >
        <SideMenu user_id={id} />

        <div>
          <div className="flex mb-5">
            <div className="flex ml-5 relative items-center space-x-1 text-lg px-2 bg-gray-200 text-gray-800 rounded-full">
              <motion.button
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="mr-5"
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
              >
                <AiOutlineArrowRight onClick={loadNexWeek} />
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
                weeklyTodoList.map((todos, idx) => {
                  const date = getDate(dateIdx + idx);
                  const { day, month_year, dayOfWeek } = date;
                  let categories = todos.categories;
                  let dayWtData = false;

                  todos.date.map((currDate) => {
                    if (currDate.month_year === month_year) {
                      currDate.days.map((curr) => {
                        if (curr.day === day) {
                          dayWtData = true;
                          categories = curr.categories;
                        }
                      });
                    }
                  });

                  return (
                    <TodoList
                      key={idx}
                      user_id={id}
                      todos={categories}
                      day={day}
                      month_year={month_year}
                      dayOfWeek={dayOfWeek}
                      dayWtData={dayWtData}
                    />
                  );
                })
              ) : (
                <div>
                  <img src={loader} alt="loader" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Main;
