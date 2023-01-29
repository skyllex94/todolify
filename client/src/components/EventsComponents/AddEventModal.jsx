import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AddEventModal({ setShowModal }) {
  const [eventName, setEventName] = useState("");

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

  return (
    <React.Fragment>
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

              <form className="p-8">
                {/*onSubmit={onSubmit} */}
                <div className="flex items-center border p-6">
                  <label
                    className="block text-gray-700 text-md font-bold mb-2 mr-3"
                    htmlFor="category_name"
                  >
                    Name:
                  </label>
                  <input
                    className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                    type="text"
                    autoFocus
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
                {/* 
                    <div className="border p-6">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2"
                        htmlFor="start_from"
                      >
                        Start From:
                      </label>
                      <input
                        className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                        type="date"
                        value={activeFrom}
                        onChange={(e) => setActiveFrom(e.target.value)}
                      />
                      <label
                        className="block text-gray-700 text-md font-bold mb-2"
                        htmlFor="end_at"
                      >
                        End At:
                      </label>
                      <input
                        className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
                        type="date"
                        value={activeUntil}
                        onChange={(e) => setActiveUntil(e.target.value)}
                      />
                    </div>
      
                    <div className="flex items-center border p-6">
                      <label
                        className="block text-gray-700 text-md font-bold"
                        htmlFor="start_from"
                      >
                        Timeblock Hours:
                      </label>
      
                      <select
                        className="flex items-center ml-2"
                        value={timeDuration}
                        onChange={(e) => setTimeDuration(e.target.value)}
                      >
                        <option value={1}>1 Hour</option>
                        <option value={2}>2 Hours</option>
                        <option value={3}>3 Hours</option>
                        <option value={4}>4 Hours</option>
                        <option value={5}>5 Hours</option>
                        <option value={6}>6 Hours</option>
                      </select>
                    </div> */}
              </form>

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  // onClick={onSubmit}
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

      <div className="fixed inset-0 z-40"></div>
    </React.Fragment>
  );
}

export default AddEventModal;
