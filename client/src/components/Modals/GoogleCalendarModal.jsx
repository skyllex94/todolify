import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { linkedCalendars } from "../../redux/settingsSlice";

export default function GoogleCalendarModal({
  setShowModal,
  linkedCalendarsLS,
}) {
  const [labelColor, setLabelColor] = useState(1);

  const dispatch = useDispatch();
  const closeModalRef = useRef();

  // Trigger removing modal on outside click or escape key pressed
  useEffect(() => {
    const closeModal = (e) => {
      if (e.keyCode === 27) setShowModal(false);
      if (closeModalRef.current && !closeModalRef.current.contains(e.target))
        setShowModal(false);
    };

    window.addEventListener("keydown", closeModal);
    window.addEventListener("mousedown", closeModal);
    return () => {
      window.removeEventListener("keydown", closeModal);
      window.removeEventListener("mousedown", closeModal);
    };
  }, [setShowModal]);

  const onSubmit = async (e) => {};

  const unlinkGoogleCalendar = () => {
    try {
      googleLogout();
    } catch (err) {
      console.error(err);
    }

    dispatch(linkedCalendars(false));
    setShowModal(false);
  };

  const linkGoogleCalendar = () => {
    setTimeout(() => {
      dispatch(linkedCalendars(true));
    }, 1000);
    setShowModal(false);
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
                <h3 className="text-3xl font-semibold">
                  Google Calendar Options
                </h3>
                <button
                  className="float-right ml-auto bg-transparent p-1 text-xl font-semibold text-black opacity-5"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <form className="p-8" onSubmit={onSubmit}>
                <div className="mb-4 flex items-center">
                  <label
                    className="text-md mb-2 mr-3 block font-bold text-gray-700"
                    htmlFor="category_name"
                  >
                    Label Color
                  </label>
                  <input
                    className="focus:shadow-outline mb-3 w-full appearance-none rounded border border-gray-500 py-2 px-3 text-gray-700 shadow focus:outline-none"
                    type="text"
                    autoFocus
                    onChange={(e) => setLabelColor(e.target.value)}
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <label
                    className="text-md mb-2 mr-3 block font-bold text-gray-700"
                    htmlFor="category_name"
                  >
                    Time:
                  </label>
                </div>

                <div className="mb-4 flex items-center">
                  <label
                    className="text-md mb-2 mr-3 block font-bold text-gray-700"
                    htmlFor="event_duration"
                  >
                    Events Color:
                  </label>
                  <select
                    className="focus:shadow-outline mb-3 w-full appearance-none rounded border border-gray-500 py-2 px-3 text-gray-700 shadow focus:outline-none"
                    type="text"
                    value={labelColor}
                    onChange={(e) => setLabelColor(e.target.value)}
                  >
                    <option value={1}>Red</option>
                    <option value={2}>Blue</option>
                    <option value={3}>Yellow</option>
                  </select>
                </div>
              </form>

              <div className="flex items-center justify-between rounded-b border-t border-solid border-slate-200 p-6">
                <div className="flex items-start">
                  <button
                    onClick={() => console.log("here we are")}
                    className="mr-1 mb-1 rounded bg-green-500 
                px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none 
                transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-green-600"
                    type="button"
                  >
                    Update
                  </button>
                  {linkedCalendarsLS ? (
                    <button
                      onClick={unlinkGoogleCalendar}
                      className="mr-1 mb-1 rounded bg-red-500 
                      px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none 
                      transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                      type="button"
                    >
                      Unlink
                    </button>
                  ) : (
                    <button
                      onClick={linkGoogleCalendar}
                      className="mr-1 mb-1 rounded bg-green-500 
                      px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none 
                      transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none
                     active:bg-green-600"
                      type="button"
                    >
                      Connect
                    </button>
                  )}
                </div>

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
