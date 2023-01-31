import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEventAsync } from "../../redux/eventsSlice";

function AddEventModal({ monthInfo, setShowModal }) {
  // States
  const [eventName, setEventName] = useState("");
  const [notes, setNotes] = useState("");
  const user_id = useSelector((state) => state.auth.user_id);

  // Actions and Destructuring
  const dispatch = useDispatch();
  const { $D, $M, $y } = monthInfo;

  // Page Checks
  const navigate = useNavigate();
  if (!user_id) navigate("/");

  // Trigger removing modal on escape key pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setShowModal]);

  // TODO: Fetch events and populate in the events UI

  const onSubmit = async (e) => {
    e.preventDefault();

    // Error checks
    if (eventName === "") return alert("Please write a name for the event.");

    if (monthInfo === null)
      return { error: "Error finding the information about the event date" };

    if (($D, $M, $y === null))
      return { error: "Some month values are missing" };

    // const day = parseInt($D);
    // Concatinate 0 to any month lower than 10 with the slice method full_date(string: "dd/mm/yyyy")
    const full_date =
      ("0" + $D).slice(-2) + "/" + ("0" + ($M + 1)).slice(-2) + "/" + $y;

    console.log("full_date:", full_date);
    let event_name = eventName;

    try {
      // Add event for to a specific day
      const res = await dispatch(
        addEventAsync({ user_id, event_name, full_date })
      );
      console.log("res:", res);
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
          className="justify-center z-3 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto max-w-xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Add Event</h3>
                <button
                  className="p-1 ml-auto bg-transparent text-black opacity-5 float-right text-xl font-semibold"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <form className="p-8" onSubmit={onSubmit}>
                <div className="flex items-center border p-6">
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

                <div className="border p-6">
                  <label
                    className="block text-gray-700 text-md font-bold mb-2"
                    htmlFor="Notes"
                  >
                    Notes:
                  </label>
                  <textarea
                    className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                    value={notes}
                    maxLength="200"
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </form>

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onSubmit}
                >
                  Create Category
                </button>

                <button
                  className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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

      <div className="opacity-25 bg-black fixed inset-0 z-100"></div>
    </div>
  );
}

export default AddEventModal;
