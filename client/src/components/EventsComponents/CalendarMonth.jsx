import React, { useState } from "react";
import AddEventModal from "./AddEventModal";

import CalendarDay from "./CalendarDay";
import { motion, AnimatePresence } from "framer-motion";

function CalendarMonth({ monthObj, setCurrMonthIdx, events }) {
  const [showModal, setShowModal] = useState(false);
  const [monthInfo, setMonthInfo] = useState(null);

  // Start here: check why in the hell doesn't it update the state correctly
  let { monthMatrix, currMonthIdx, monthName } = monthObj;

  const month_year = formatMonthYear();

  function formatMonthYear() {
    let month_year = monthMatrix[2][2];
    const { $M, $y } = month_year;
    return ("0" + ($M + 1)).slice(-2) + "/" + $y;
  }

  const eventsMonth = events.date.find(
    (curr) => curr.month_year === month_year
  );
  console.log("eventsMonth:", eventsMonth);

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const addEventModal = (day) => {
    setMonthInfo(day);
    setShowModal(true);
  };

  let monthTitle = monthName.$d.toString().split(" ");
  monthTitle = monthTitle[1] + " " + monthTitle[3];

  const previousMonth = () => setCurrMonthIdx((prev) => prev - 1);
  const nextMonth = () => setCurrMonthIdx((prev) => prev + 1);

  return (
    <div className="container mx-auto ml-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={currMonthIdx}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          className="wrapper bg-white rounded shadow w-full "
        >
          <div className="header flex justify-between border-b p-2">
            <span className="text-lg font-bold">{monthTitle}</span>
            <div className="buttons">
              <button className="p-1" onClick={() => previousMonth()}>
                <svg
                  width="1em"
                  fill="gray"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-arrow-left-circle"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"
                  />
                </svg>
              </button>
              <button className="p-1" onClick={() => nextMonth()}>
                <svg
                  width="1em"
                  fill="gray"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-arrow-right-circle"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr>
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
                <tr className="text-center h-20" key={i}>
                  {row.map((day, idx) => {
                    const { $M, $D } = day;

                    let dayEventsList = null;
                    if (eventsMonth) {
                      const day = eventsMonth.days.find(
                        (curr) => curr.day === $D
                      );
                      if (day?.events.length > 0) dayEventsList = day.events;
                    }

                    let dimDay;
                    if (currMonthIdx !== parseInt($M)) dimDay = "bg-gray-100";
                    // TODO: Fix the dimming on years in the past

                    return (
                      <td
                        key={idx}
                        className={`border p-1 ${dimDay} h-40 xl:w-40 lg:w-30 md:w-30 
                        sm:w-20 w-10 transition cursor-pointer ease-out hover:border-red-500/50`}
                      >
                        <CalendarDay
                          day={day}
                          month_year={month_year}
                          events={dayEventsList}
                          addEventModal={addEventModal}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && (
            <AddEventModal monthInfo={monthInfo} setShowModal={setShowModal} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default CalendarMonth;
