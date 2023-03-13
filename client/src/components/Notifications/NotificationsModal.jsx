import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useDisplayAlert } from "../../hooks/useDisplayAlert";

export default function NotificationsModal({ setShowModal, task }) {
  const refCloseModal = useRef();
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState("");
  const { enableAlert, displayAlert } = useDisplayAlert();

  const times = ["12:00", "12:16"];

  const addNotification = async () => {
    if (reminder === "" || reminder === null) {
      alert("Please select a time for the notification");
      return;
    }

    const notifPermission = await Notification.requestPermission();
    if (notifPermission === "default" || notifPermission === "denied") {
      alert(
        "Please allow notifications for this app in order to receive reminders."
      );
      return;
    }
    const now = new Date();
    const reminderDate = new Date(reminder);
    const diff = reminderDate - now;

    console.log("diff:", diff);
    console.log(reminder);
    console.log("reminderDate:", reminderDate);

    setTimeout(() => {
      new Notification("Todolify Reminder", {
        body: `This is a reminder to: "${task}"`,
      });
    }, diff);
  };

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
              <h3 className="text-3xl font-semibold">Create a Reminder</h3>
              <button
                className="float-right ml-auto bg-transparent p-1 text-xl font-semibold text-black opacity-5"
                onClick={() => setShowModal(false)}
              />
            </div>

            <form className="p-8">
              <div className="flex items-center justify-between border p-6">
                <label
                  className="text-md mb-2 mr-3 block font-bold text-gray-700"
                  htmlFor="reminder time"
                >
                  Which day:
                </label>
                <select
                  className="ml-2 flex items-center"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value={"Today"}>Today</option>
                  <option value={"Tomorrow"}>Tomorrow</option>
                  <option value={"In 2 Days"}>In 2 Days</option>
                </select>
              </div>

              <div className="flex items-center justify-between border p-6">
                <label
                  className="text-md mb-2 mr-3 block font-bold text-gray-700"
                  htmlFor="reminder time"
                >
                  Remind me at:
                </label>

                <select
                  className="ml-2 flex items-center"
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                >
                  <option defaultValue={"Select Time"}>Select Time</option>
                  <option value={"11:30"}>11:30 AM</option>
                  <option value={`2023-03-13T${times[0]}`}>12:00 AM</option>
                  <option value={`2023-03-13T${times[1]}`}>12:30 AM</option>
                  <option value={"1:00"}>1:00 PM</option>
                  <option value={"1:30"}>1:30 PM</option>
                  <option value={"2:00"}>2:00 PM</option>
                  <option value={"2:30"}>2:30 PM</option>
                </select>
              </div>
            </form>
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              <button
                className="mr-3 mb-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                type="button"
                onClick={addNotification}
              >
                Add Notification
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
      <div className="fixed inset-0 z-40 bg-black opacity-25" />
    </React.Fragment>
  );
}
