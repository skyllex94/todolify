import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUserData } from "../../redux/dataSlice";
import { removeEventAsync, updateEventAsync } from "../../redux/eventsSlice";

function UpdateEventModal({
  eventInfo, // id, idx, name and notes
  day_idx,
  day,
  month_idx,
  month_year,
  setShowInfoEventModal,
}) {
  const [update, setUpdate] = useState(false);
  const event_id = eventInfo.id;
  const event_idx = eventInfo.idx;
  const [eventName, setEventName] = useState(eventInfo.name);
  const [eventNotes, setEventNotes] = useState(eventInfo.notes);
  const user_id = useSelector((state) => state.auth.user_id);

  const dispatch = useDispatch();

  // Trigger removing modal on escape key pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setShowInfoEventModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setShowInfoEventModal]);

  async function updateEvent() {
    if (!user_id) alert("Error with fetching the user id");

    try {
      const res = await dispatch(
        updateEventAsync({
          user_id,
          event_idx,
          event_name: eventName,
          event_notes: eventNotes,
          day_idx,
          month_idx,
        })
      );
      console.log("res:", res);

      if (res.type === "updateEventAsync/fulfilled")
        dispatch(saveUserData(res.payload.data.userTodoList));
      setShowInfoEventModal(false);
    } catch (err) {
      alert(err.message);
    }
  }

  async function deleteEvent() {
    if (
      window.confirm("Are you sure you want to delete this event?") === true
    ) {
      try {
        const res = await dispatch(
          removeEventAsync({
            user_id,
            day_idx,
            month_idx,
            event_id,
          })
        );

        if (res.type === "removeEventAsync/fulfilled")
          setShowInfoEventModal(false);
      } catch (err) {
        alert(err.message);
      }
    }
  }

  // TODO: When trying to update, it does to deleting instead, fix it please

  return (
    <div>
      <AnimatePresence>
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 300, opacity: 0 }}
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto max-w-xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">{eventInfo.name}</h3>
                <button
                  className="p-1 ml-auto bg-transparent text-black opacity-5 float-right text-xl font-semibold"
                  onClick={() => setShowInfoEventModal(false)}
                />
              </div>

              <form className="p-8">
                {update ? (
                  <div className="border p-6">
                    <div className="block flex items-center">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2 mr-10"
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

                    <div className="flex">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2 mr-3"
                        htmlFor="Notes"
                      >
                        Notes:
                      </label>
                    </div>
                    <textarea
                      className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                      maxLength="200"
                      value={eventNotes}
                      onChange={(e) => setEventNotes(e.target.value)}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex mb-3">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2 mr-10"
                        htmlFor="category_name"
                      >
                        Event Name: {eventInfo.name}
                      </label>
                      <label
                        className="block text-gray-700 text-md font-bold mb-2 mr-3"
                        htmlFor="category_name"
                      >
                        Date: {day.$D}/{month_year}
                      </label>
                    </div>
                    <div className="border p-6">
                      <div className="flex">
                        <label
                          className="block text-gray-700 text-md font-bold mb-2 mr-3"
                          htmlFor="Notes"
                        >
                          Notes:
                        </label>
                        {eventInfo.notes ? (
                          <label
                            className="block text-gray-700 text-md font-bold mb-2"
                            htmlFor="Notes"
                          >
                            {eventInfo.notes}
                          </label>
                        ) : (
                          <label
                            className="block text-gray-700 text-md font-bold mb-2"
                            htmlFor="Notes"
                          >
                            <i>No notes for this event</i>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </form>

              <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                {update ? (
                  <button
                    onClick={() => updateEvent()}
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Confirm
                  </button>
                ) : (
                  <div className="flex items-start">
                    <button
                      onClick={() => setUpdate(true)}
                      className="bg-green-500 text-white active:bg-green-600 font-bold 
                      uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none 
                      focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteEvent(true)}
                      className="bg-red-500 text-white active:bg-red-600 font-bold 
                      uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none 
                      focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                )}

                <button
                  className="bg-white-500 text-black active:bg-white-600 font-bold 
                  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none 
                  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowInfoEventModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="opacity-25 bg-black fixed inset-0 "></div>
    </div>
  );
}

export default UpdateEventModal;
