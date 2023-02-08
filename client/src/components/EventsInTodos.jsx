import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { openEventsInTodoList } from "../redux/settingsSlice";
import ToggleEventInTodos from "./ToggleEventInTodos";

function EventsInTodos({ events, day, month_year }) {
  // Make sure you pass the correct object to update wt useSelector
  const isOpen = useSelector((state) => state.settings.isOpenEventsInTodoList);
  const dispatch = useDispatch();
  const openPanel = () => dispatch(openEventsInTodoList(!isOpen));

  return (
    <AnimatePresence mode="wait">
      <div className="brackets-events min-w-[93%]">
        <div onClick={openPanel} className="flex items-center justify-between">
          <div className="flex title">
            <div className="p-1">
              <AiOutlineStar />
            </div>
            Events
          </div>
          {isOpen ? (
            <motion.div
              key={isOpen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <IoIosArrowUp />
            </motion.div>
          ) : (
            <motion.div
              key={isOpen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={openPanel}
            >
              <IoIosArrowDown />
            </motion.div>
          )}
        </div>

        <motion.div
          key={isOpen}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className={isOpen ? `flex items-center` : "hidden"}
        >
          <div className="items-center my-1">
            <div className="flex flex-col">
              {events.map((curr, idx) => (
                <div key={idx} className="flex mb-1 items-center">
                  <ToggleEventInTodos
                    curr={curr}
                    event_idx={idx}
                    day={day}
                    month_year={month_year}
                  />
                  <label>{curr.event}</label>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default EventsInTodos;
