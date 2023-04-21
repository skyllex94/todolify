import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEventAsync } from "../../redux/eventsSlice";
import { saveUserData } from "../../redux/dataSlice";
import { useDisplayAlert } from "../../hooks/useDisplayAlert";
import Alert from "../Alert/Alert";

function AddEventModal({ monthInfo, setShowModal, linkedCalendars }) {
  // States
  const [eventName, setEventName] = useState("");
  const [notes, setNotes] = useState("");
  const [duration, setDuration] = useState(1);
  const [eventTime, setEventTime] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const { alertState, enableAlert, setEnableAlert, displayAlert } =
    useDisplayAlert();

  const user_id = useSelector((state) => state.auth.user_id);
  const google_calendar_color = useSelector(
    (state) => state.settings.googleCalendarColor
  );
  const closeModalRef = useRef();

  // Actions and Destructuring
  const dispatch = useDispatch();
  const { $D, $M, $y } = monthInfo;

  // Page Checks
  const navigate = useNavigate();
  if (!user_id) navigate("/");

  // Trigger removing modal on outside click or escape key pressed
  useEffect(() => {
    const closeModal = (e) => {
      if (e.keyCode === 27) setShowModal(false);
      if (!closeModalRef?.current.contains(e.target)) setShowModal(false);
    };

    window.addEventListener("keydown", closeModal);
    window.addEventListener("mousedown", closeModal);
    return () => {
      window.removeEventListener("keydown", closeModal);
      window.removeEventListener("mousedown", closeModal);
    };
  }, [setShowModal]);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Error checks
    if (eventName === "") {
      displayAlert("error", "Please write a name for the event.");
      return;
    }

    if (monthInfo === null) {
      displayAlert(
        "error",
        "Error finding the information about the event date"
      );
      return;
    }

    if (($D, $M, $y === null)) {
      displayAlert("error", "Some month values are missing");
      return;
    }

    if (eventTime === "" || eventTime === null) {
      displayAlert("error", "The event start time hasn't been set");
      return;
    }

    if (duration === null) {
      displayAlert("error", "No duration of the task has been placed");
      return;
    }

    // Disable Submit button, so it can not be pressed multiple times
    setDisableButton(true);

    const day = parseInt($D);
    const month_year = ("0" + ($M + 1)).slice(-2) + "/" + $y;

    try {
      // Add event for to a specific day
      const res = await dispatch(
        addEventAsync({
          user_id,
          event_name: eventName,
          event_time: eventTime,
          duration,
          day,
          month_year,
          notes,
          linked_calendars: linkedCalendars,
          google_calendar_color,
        })
      );

      if (res.payload?.error)
        alert(
          `Error occured while connecting with Google Calendar: ${
            res.payload.error || null
          }`
        );

      if (res.payload.status === 200)
        dispatch(saveUserData(res.payload.data.userTodoList));

      setShowModal(false);
    } catch (err) {
      return { err };
    }
  };

  return (
    <div>
      <AnimatePresence>
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 300, opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
        >
          <div ref={closeModalRef} className="relative w-auto max-w-xl">
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                <h3 className="text-3xl font-semibold">Add Event</h3>
                <button
                  className="float-right ml-auto bg-transparent p-1 text-xl font-semibold text-black opacity-5"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <div className="px-2">
                <AnimatePresence>
                  {enableAlert && (
                    <Alert
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      type={alertState.type}
                      message={alertState.message}
                      setEnableAlert={setEnableAlert}
                    />
                  )}
                </AnimatePresence>
              </div>

              <form className="p-8">
                <div className="mb-4 flex items-center">
                  <label
                    className="text-md mb-2 mr-3 block font-bold text-gray-700"
                    htmlFor="category_name"
                  >
                    Event:
                  </label>
                  <input
                    className="focus:shadow-outline mb-3 w-full appearance-none rounded border border-gray-500 py-2 px-3 text-gray-700 shadow focus:outline-none"
                    type="text"
                    autoFocus
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <label
                    className="text-md mb-2 mr-3 block font-bold text-gray-700"
                    htmlFor="category_name"
                  >
                    Time:
                  </label>

                  <input
                    className="focus:shadow-outline mb-3 w-full appearance-none rounded border border-gray-500 py-2 px-3 text-gray-700 shadow focus:outline-none"
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <label
                    className="text-md mb-2 mr-3 block font-bold text-gray-700"
                    htmlFor="event_duration"
                  >
                    Duration:
                  </label>
                  <select
                    className="focus:shadow-outline mb-3 w-full appearance-none rounded border border-gray-500 py-2 px-3 text-gray-700 shadow focus:outline-none"
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value={1}>1 Hour</option>
                    <option value={2}>2 Hours</option>
                    <option value={3}>3 Hours</option>
                    <option value={4}>4 Hours</option>
                    <option value={5}>5 Hours</option>
                    <option value={6}>6 Hours</option>
                  </select>
                </div>

                <label
                  className="text-md mb-2 block font-bold text-gray-700"
                  htmlFor="Notes"
                >
                  Notes:
                </label>
                <textarea
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border border-gray-500 py-2 px-3 text-gray-700 shadow focus:outline-none"
                  value={notes}
                  rows={2}
                  maxLength="200"
                  onChange={(e) => setNotes(e.target.value)}
                />
              </form>

              <div className="flex items-center justify-between rounded-b border-t border-solid border-slate-200 p-6">
                <button
                  className="mr-1 mb-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                  type="button"
                  disabled={disableButton}
                  onClick={onSubmit}
                >
                  Create Event
                </button>

                <button
                  className="bg-white-500 active:bg-white-600 mr-1 mb-1 
                  rounded px-6 py-3 text-sm font-bold uppercase text-black shadow 
                  outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="fixed inset-0 bg-black opacity-25"></div>
    </div>
  );
}

export default AddEventModal;
