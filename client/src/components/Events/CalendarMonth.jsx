import React, { useCallback, useEffect, useState } from "react";
import AddEventModal from "../Modals/AddEventModal";
import GoogleCalendarModal from "../Modals/GoogleCalendarModal";

import CalendarDay from "./CalendarDay";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import { useGoogleLogin, hasGrantedAllScopesGoogle } from "@react-oauth/google";
import {
  checkRefreshToken,
  syncWtGoogleCalendar,
} from "../../redux/eventsSlice";
import { useDispatch, useSelector } from "react-redux";

function CalendarMonth({ monthObj, setCurrMonthIdx, user_id }) {
  const [showModal, setShowModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [monthInfo, setMonthInfo] = useState(null);
  const [syncedCalendar, setSyncedCalendar] = useState(false);

  const events = useSelector((state) => state.data);
  const dispatch = useDispatch();

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

  // Check if there is Google Calendar refresh token in DB
  const retrieveGoogleRefreshToken = useCallback(async () => {
    const res = await dispatch(checkRefreshToken(user_id));
    const { data } = res.payload;

    // Check result and if there is a refresh token already present in DB
    if (data?.refreshTokenExist === true) setSyncedCalendar(true);
  }, [dispatch, user_id]);

  useEffect(() => {
    retrieveGoogleRefreshToken();
  }, [retrieveGoogleRefreshToken]);

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

  const googleSignOnSuccess = async (credentialResponse) => {
    // Check if all access requested is granted
    const hasAccess = hasGrantedAllScopesGoogle(
      credentialResponse,
      "profile",
      "email",
      "openid",
      "https://www.googleapis.com/auth/calendar"
    );

    if (!hasAccess) {
      alert(
        "Please make sure you grant permission to all the required services"
      );
      return;
    }

    // Prepare & send payload on the server-side
    const { code } = credentialResponse;
    const res = await dispatch(syncWtGoogleCalendar({ code, user_id }));
    console.log("res:", res);

    if (res.status === 200) {
      setSyncedCalendar(true);
    }
  };

  const googleOnFailure = (err) => {
    alert(err.message);
  };

  const googleOAuth = useGoogleLogin({
    onSuccess: googleSignOnSuccess,
    onError: googleOnFailure,
    scope: "profile email openid https://www.googleapis.com/auth/calendar",
    flow: "auth-code",
  });

  return (
    <div
      onWheel={(e) => scrollChange(e)}
      className="container mx-auto max-h-screen pt-20"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currMonthIdx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="wrapper w-full rounded bg-white shadow"
        >
          <div className="flex justify-between pl-2">
            <span className="text-lg font-bold">{monthTitle}</span>

            <div className="flex items-center">
              <div className="mr-3 max-w-md sm:px-0">
                {syncedCalendar ? (
                  <button
                    type="button"
                    onClick={() => setShowCalendarModal(true)}
                    className="inline-flex 
                  w-full items-center justify-between rounded-lg px-5 
                  text-center text-sm font-medium hover:bg-gray-200
                  focus:outline-none focus:ring-4 focus:ring-[#911c41]/50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      zoomAndPan="magnify"
                      viewBox="0 0 30 30.000001"
                      height="15"
                      preserveAspectRatio="xMidYMid meet"
                      version="1.0"
                    >
                      <defs>
                        <clipPath id="id1">
                          <path
                            d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 "
                            clipRule="nonzero"
                          />
                        </clipPath>
                      </defs>
                      <g clipPath="url(#id1)">
                        <path
                          fill="rgb(13.729858%, 12.159729%, 12.548828%)"
                          d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 "
                          fillOpacity="1"
                          fillRule="nonzero"
                        />
                      </g>
                    </svg>
                    Syncing...<div></div>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => googleOAuth()}
                    className="inline-flex 
                  w-full items-center justify-between rounded-lg px-5 
                  text-center text-sm font-medium hover:bg-gray-200
                  focus:outline-none focus:ring-4 focus:ring-[#911c41]/50"
                  >
                    <svg
                      className="mr-2 h-4 "
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 
                      256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 
                      94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 
                      140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      />
                    </svg>
                    Sync with Google Calendar<div></div>
                  </button>
                )}
              </div>

              <div className="buttons">
                <button
                  className="mr-2 border py-1 px-5 md:px-1 lg:px-1 xl:px-1"
                  onClick={() => previousMonth()}
                >
                  <AiOutlineArrowUp />
                </button>
                <button
                  className="border py-1 px-5 md:px-1 lg:px-1 xl:px-1"
                  onClick={() => nextMonth()}
                >
                  <AiOutlineArrowDown />
                </button>
              </div>
            </div>
          </div>
          <table className="table w-full">
            <thead>
              <tr>
                {startFromSunday && handleStartFromSunday()}
                {weekDays.map((day, idx) => (
                  <th
                    key={idx}
                    className="lg:w-30 md:w-30 h-10 w-10 border-r p-2 text-xs sm:w-20 xl:w-40 xl:text-sm"
                  >
                    <span className="hidden sm:block md:block lg:block xl:block">
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
                        className={`border ${dimDay} h-30 lg:w-30 md:w-30 w-10 
                          px-2 transition ease-out sm:w-20 xl:w-40`}
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
            <AddEventModal monthInfo={monthInfo} setShowModal={setShowModal} />
          )}
          {showCalendarModal && (
            <GoogleCalendarModal setShowModal={setShowCalendarModal} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default CalendarMonth;
