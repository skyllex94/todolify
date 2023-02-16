import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEventAsync } from "../../redux/eventsSlice";
import { saveUserData } from "../../redux/dataSlice";

function AddEventModal({ monthInfo, setShowModal }) {
  // States
  const [eventName, setEventName] = useState("");
  const [notes, setNotes] = useState("");
  const user_id = useSelector((state) => state.auth.user_id);
  const closeModalRef = useRef();

  // Actions and Destructuring
  const dispatch = useDispatch();
  const { $D, $M, $y } = monthInfo;

  // Page Checks
  const navigate = useNavigate();
  if (!user_id) navigate("/");

  // useEffect(() => {
  //   const closeModal = (e) => {
  //     if (closeModalRef.current && !closeModalRef.current.contains(e.target))
  //       setShowModal(false);
  //   };

  //   document.addEventListener("mousedown", closeModal);
  //   return () => {
  //     window.removeEventListener("mousedown", closeModal);
  //   };
  // }, [setShowModal]);

  // Trigger removing modal on outside click or escape key pressed
  useEffect(() => {
    const keyPressed = (e) => {
      if (e.keyCode === 27) setShowModal(false);
    };

    const closeModal = (e) => {
      if (closeModalRef.current && !closeModalRef.current.contains(e.target))
        setShowModal(false);
    };

    window.addEventListener("mousedown", closeModal);
    window.addEventListener("keydown", keyPressed);
    return () => {
      window.removeEventListener("keydown", keyPressed);
      window.removeEventListener("mousedown", closeModal);
    };
  }, [setShowModal]);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Error checks
    if (eventName === "") return alert("Please write a name for the event.");

    if (monthInfo === null)
      return { error: "Error finding the information about the event date" };

    if (($D, $M, $y === null))
      return { error: "Some month values are missing" };

    const day = parseInt($D);
    const month_year = ("0" + ($M + 1)).slice(-2) + "/" + $y;

    let event_name = eventName;
    try {
      // Add event for to a specific day
      const res = await dispatch(
        addEventAsync({ user_id, event_name, day, month_year, notes })
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
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div ref={closeModalRef} className="relative w-auto max-w-xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Add Event</h3>
                <button
                  className="p-1 ml-auto bg-transparent text-black opacity-5 float-right text-xl font-semibold"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <form className="p-8" onSubmit={onSubmit}>
                <div className="flex items-center mb-4">
                  <label
                    className="block text-gray-700 text-md font-bold mb-2 mr-3"
                    htmlFor="category_name"
                  >
                    Event:
                  </label>
                  <input
                    className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                    type="text"
                    autoFocus
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>

                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="Notes"
                >
                  Notes:
                </label>
                <textarea
                  className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                  value={notes}
                  rows={4}
                  maxLength="200"
                  onChange={(e) => setNotes(e.target.value)}
                />
              </form>

              <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onSubmit}
                >
                  Create Category
                </button>

                <button
                  className="bg-white-500 text-black active:bg-white-600 font-bold 
                  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none 
                  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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

      <div className="opacity-25 bg-black fixed inset-0"></div>
    </div>
  );
}

export default AddEventModal;
