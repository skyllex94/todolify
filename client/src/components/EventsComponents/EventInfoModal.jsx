import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

function EventInfoModal({ eventInfo, setShowInfoEventModal }) {
  const [update, setUpdate] = useState(false);

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
                <h3 className="text-3xl font-semibold">{eventInfo.name}</h3>
                <button
                  className="p-1 ml-auto bg-transparent text-black opacity-5 float-right text-xl font-semibold"
                  onClick={() => setShowInfoEventModal(false)}
                />
              </div>

              <form className="p-8">
                {update ? (
                  <div className="border p-6">
                    <div className="block flex">
                      <input
                        className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                        type="text"
                        autoFocus
                        onChange={(e) => setShowInfoEventModal(e.target.value)}
                      />
                    </div>

                    <textarea
                      className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                      maxLength="200"
                      onChange={(e) => setShowInfoEventModal(e.target.value)}
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
                        Date: 01/01/2023
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

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                {update ? (
                  <button
                    // onClick={setShowInfoEventModal(false)}
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    onClick={() => setUpdate(false)}
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Update
                  </button>
                )}

                <button
                  className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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

      <div className="opacity-25 bg-black fixed inset-0 z-100"></div>
    </div>
  );
}

export default EventInfoModal;
