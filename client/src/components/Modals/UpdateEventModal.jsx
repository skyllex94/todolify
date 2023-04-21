import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUserData } from "../../redux/dataSlice";
import { removeEventAsync, updateEventAsync } from "../../redux/eventsSlice";

function UpdateEventModal({
  eventInfo, // id, idx, name, notes, google_event_id, google_start_date, google_end_date
  day_idx,
  day,
  month_idx,
  month_year,
  setShowInfoEventModal,
}) {
  const [update, setUpdate] = useState(false);
  const {
    id: event_id,
    idx: event_idx,
    google_event_id,
    google_start_date,
    google_end_date,
  } = eventInfo;

  const [eventName, setEventName] = useState(eventInfo.name);
  const [eventNotes, setEventNotes] = useState(eventInfo.notes);
  const user_id = useSelector((state) => state.auth.user_id);
  const linked_calendars = useSelector(
    (state) => state.settings.linkedCalendars
  );

  const closeModalRef = useRef();
  const dispatch = useDispatch();

  // Trigger removing modal on outside click or escape key pressed
  useEffect(() => {
    const closeModal = (e) => {
      if (e.keyCode === 27) setShowInfoEventModal(false);
      if (closeModalRef.current && !closeModalRef.current.contains(e.target))
        setShowInfoEventModal(false);
    };

    window.addEventListener("keydown", closeModal);
    window.addEventListener("mousedown", closeModal);
    return () => {
      window.removeEventListener("keydown", closeModal);
      window.removeEventListener("mousedown", closeModal);
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
          google_event_id,
          google_start_date,
          google_end_date,
          linked_calendars,
        })
      );

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
            google_event_id,
            linked_calendars,
          })
        );

        if (res.type === "removeEventAsync/fulfilled") {
          dispatch(saveUserData(res.payload.data.userTodoList));
          setShowInfoEventModal(false);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  }

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
                <h3 className="text-3xl font-semibold">{eventInfo.name}</h3>
                <button
                  className="float-right ml-auto bg-transparent p-1 text-xl font-semibold text-black opacity-5"
                  onClick={() => setShowInfoEventModal(false)}
                />
              </div>

              <form className="p-8">
                {update ? (
                  <div className="border p-6">
                    <div className="flex items-center">
                      <label
                        className="text-md mb-2 mr-10 block font-bold text-gray-700"
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

                    <div className="flex">
                      <label
                        className="text-md mb-2 mr-3 block font-bold text-gray-700"
                        htmlFor="Notes"
                      >
                        Notes:
                      </label>
                    </div>
                    <textarea
                      className="focus:shadow-outline mb-3 w-full appearance-none rounded border border-gray-500 py-2 px-3 text-left text-gray-700 shadow focus:outline-none"
                      maxLength="200"
                      value={eventNotes}
                      onChange={(e) => setEventNotes(e.target.value)}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="mb-3 flex">
                      <label
                        className="text-md mb-2 mr-10 block font-bold text-gray-700"
                        htmlFor="category_name"
                      >
                        Event Name: {eventInfo.name}
                      </label>
                      <label
                        className="text-md mb-2 mr-3 block font-bold text-gray-700"
                        htmlFor="category_name"
                      >
                        Date: {day.$D}/{month_year},
                      </label>
                    </div>
                    <div className="border p-6">
                      <div className="flex">
                        <label
                          className="text-md mb-2 mr-3 block font-bold text-gray-700"
                          htmlFor="Notes"
                        >
                          Notes:
                        </label>
                        {eventInfo.notes ? (
                          <label
                            className="text-md mb-2 block text-left font-bold text-gray-700"
                            htmlFor="Notes"
                          >
                            {eventInfo.notes}
                          </label>
                        ) : (
                          <label
                            className="text-md mb-2 block font-bold text-gray-700"
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

              <div className="flex items-center justify-between rounded-b border-t border-solid border-slate-200 p-6">
                {update ? (
                  <button
                    onClick={() => updateEvent()}
                    className="mr-1 mb-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                    type="button"
                  >
                    Confirm
                  </button>
                ) : (
                  <div className="flex items-start">
                    <button
                      onClick={() => setUpdate(true)}
                      className="mr-1 mb-1 rounded bg-green-500 
                      px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none 
                      transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-green-600"
                      type="button"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteEvent(true)}
                      className="mr-1 mb-1 rounded bg-red-500 
                      px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none 
                      transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                )}

                <button
                  className="bg-white-500 active:bg-white-600 mr-1 mb-1 
                  rounded px-6 py-3 text-sm font-bold uppercase text-black shadow 
                  outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
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

      <div className="fixed inset-0 bg-black opacity-25 "></div>
    </div>
  );
}

export default UpdateEventModal;
