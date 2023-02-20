import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategoryAsync } from "../redux/todosSlice";
import { motion } from "framer-motion";

export default function ModalAddCategory({
  setShowModal,
  user_id,
  day,
  month_year,
  dayWtData,
}) {
  const [category, setCategory] = useState("");
  const [activeFrom, setActiveFrom] = useState("");
  const [activeUntil, setActiveUntil] = useState("");
  const [timeDuration, setTimeDuration] = useState(0);

  const dispatch = useDispatch();

  const refCloseModal = useRef();

  useEffect(() => {
    const closeModal = (e) => {
      if (e.keyCode === 27) setShowModal(false);
      if (!refCloseModal?.current?.contains(e.target)) setShowModal(false);
    };
    window.addEventListener("keydown", closeModal);
    window.addEventListener("mousedown", closeModal);

    return () => {
      window.removeEventListener("keydown", closeModal);
      window.removeEventListener("mousedown", closeModal);
    };
  }, [setShowModal]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (category.length < 2) {
      alert("Please provide a full name for your category");
      return;
    }

    if (category) {
      try {
        // Add the new category and update the state to include it
        dispatch(
          addCategoryAsync({
            user_id,
            dayWtData,
            day,
            month_year,
            category,
            activeFrom,
            activeUntil,
            timeDuration,
          })
        );
      } catch (err) {
        console.log(err.message);
      }
    }

    setShowModal(false);
  };

  return (
    <React.Fragment>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
      >
        <div ref={refCloseModal} className="relative w-auto max-w-xl">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Add New Bucket</h3>
              <button
                className="float-right ml-auto bg-transparent p-1 text-xl font-semibold text-black opacity-5"
                onClick={() => setShowModal(false)}
              />
            </div>

            <form className="p-8" onSubmit={onSubmit}>
              <div className="flex items-center border p-6">
                <label
                  className="text-md mb-2 mr-3 block font-bold text-gray-700"
                  htmlFor="category_name"
                >
                  Name:
                </label>
                <input
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border border-gray-500 py-2 px-3 text-gray-700 shadow focus:outline-none"
                  type="text"
                  autoFocus
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="border p-6">
                <label
                  className="text-md mb-2 block font-bold text-gray-700"
                  htmlFor="start_from"
                >
                  Start From:
                </label>
                <input
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border border-gray-500 py-2 px-3 text-gray-700 shadow focus:outline-none"
                  type="date"
                  value={activeFrom}
                  onChange={(e) => setActiveFrom(e.target.value)}
                />
                <label
                  className="text-md mb-2 block font-bold text-gray-700"
                  htmlFor="end_at"
                >
                  End At:
                </label>
                <input
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border border-gray-500 py-2 px-3 text-gray-700 shadow focus:outline-none"
                  type="date"
                  value={activeUntil}
                  onChange={(e) => setActiveUntil(e.target.value)}
                />
              </div>

              <div className="flex items-center border p-6">
                <label
                  className="text-md block font-bold text-gray-700"
                  htmlFor="start_from"
                >
                  Timeblock Hours:
                </label>

                <select
                  className="ml-2 flex items-center"
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
              </div>
            </form>
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              <button
                className="mr-3 mb-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                type="button"
                onClick={onSubmit}
              >
                Create Bucket
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
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </React.Fragment>
  );
}
