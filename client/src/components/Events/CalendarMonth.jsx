import React, { useState } from "react";
import AddEventModal from "./AddEventModal";

import CalendarDay from "./CalendarDay";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useSelector } from "react-redux";

function CalendarMonth({ monthObj, setCurrMonthIdx }) {
  const [showModal, setShowModal] = useState(false);
  const [monthInfo, setMonthInfo] = useState(null);
  const events = useSelector((state) => state.data);

  const startFromSunday = useSelector(
    (state) => state.settings.startFromSunday
  );

  let { monthMatrix, currMonthIdx, monthName } = monthObj;

  const unformattedCurrMonth = monthMatrix[2][2];
  const month_year = formatMonthYear(unformattedCurrMonth);

  function formatMonthYear(unformattedCurrMonth) {
    let month_year = unformattedCurrMonth;
    const { $M, $y } = month_year;
    return ("0" + ($M + 1)).slice(-2) + "/" + $y;
  }

  const eventsMonth = events.date.find(
    (curr) => curr.month_year === month_year
  );

  let weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const addEventModal = (day) => {
    setMonthInfo(day);
    setShowModal(true);
  };

  let monthTitle = monthName.$d.toString().split(" ");
  monthTitle = monthTitle[1] + " " + monthTitle[3];

  const previousMonth = () => setCurrMonthIdx((prev) => prev - 1);
  const nextMonth = () => setCurrMonthIdx((prev) => prev + 1);

  const scrollChange = (e) => {
    // The AnimatePresence will be triggered each time the state is changed
    if (e.deltaY < 0) {
      previousMonth();
    } else {
      nextMonth();
    }
  };

  // Take the last day of the week pop it and include it in the beginning
  const handleStartFromSunday = () => {
    const sunday = weekDays.pop();
    weekDays.unshift(sunday);
  };

  return (
    <div
      onWheel={(e) => scrollChange(e)}
      className="container mx-auto pt-20 max-h-screen"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currMonthIdx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="wrapper bg-white rounded shadow w-full"
        >
          <div className="flex justify-between pl-14 md:pl-2 lg:pl-2 xl:pl-2 sm:pl-2 py-2">
            <span className="text-lg font-bold">{monthTitle}</span>
            <div className="buttons">
              <button
                className="py-1 px-5 md:px-1 lg:px-1 xl:px-1 border mr-2"
                onClick={() => previousMonth()}
              >
                <AiOutlineArrowUp />
              </button>
              <button
                className="py-1 px-5 md:px-1 lg:px-1 xl:px-1 border"
                onClick={() => nextMonth()}
              >
                <AiOutlineArrowDown />
              </button>
            </div>
          </div>
          <table className="table w-full">
            <thead>
              <tr>
                {startFromSunday && handleStartFromSunday()}
                {weekDays.map((day, idx) => (
                  <th
                    key={idx}
                    className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs"
                  >
                    <span className="xl:block lg:block md:block sm:block hidden">
                      {day}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthMatrix.map((row, i) => (
                <tr className="text-center" key={i}>
                  {row.map((day, idx) => {
                    const { $M, $D } = day;

                    let dayEventsList = null;
                    if (eventsMonth) {
                      const day = eventsMonth.days.find(
                        (curr) => curr.day === $D
                      );
                      if (
                        day?.events.length > 0 &&
                        unformattedCurrMonth.$M === $M
                      )
                        dayEventsList = day.events;
                    }

                    let dimDay;
                    let white = "bg-white";
                    if (currMonthIdx !== parseInt($M)) {
                      // Fix for months over the year mark to display UI
                      if (currMonthIdx < 0) {
                        const convertMonth = currMonthIdx;
                        currMonthIdx = convertMonth + 12;
                      }
                      if (currMonthIdx > 11) {
                        const convertMonth = currMonthIdx;
                        currMonthIdx = convertMonth - 12;
                      }
                      dimDay = "bg-gray-100";
                      white = dimDay;
                    }

                    return (
                      <td
                        key={idx}
                        className={`border ${dimDay} h-30 xl:w-40 px-2 lg:w-30 md:w-30 
                          sm:w-20 w-10 transition cursor-pointer ease-out`}
                      >
                        <div className={white}>
                          <CalendarDay
                            day={day}
                            month_year={month_year}
                            events={dayEventsList}
                            addEventModal={addEventModal}
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && (
            <AddEventModal
              monthInfo={monthInfo}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default CalendarMonth;
