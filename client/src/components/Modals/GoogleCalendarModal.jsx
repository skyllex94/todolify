import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";

export default function GoogleCalendarModal({ setShowModal }) {
  const [labelColor, setLabelColor] = useState(null);

  const closeModalRef = useRef();

  const onSubmit = async (e) => {};

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
                    value={labelColor}
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
                <button
                  className="mr-1 mb-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                  type="button"
                  onClick={onSubmit}
                >
                  Create Category
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
