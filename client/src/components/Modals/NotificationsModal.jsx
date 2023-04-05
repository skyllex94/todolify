import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDisplayAlert } from "../../hooks/useDisplayAlert";
import Alert from "../Alert/Alert";
import axios from "axios";

export default function NotificationsModal({ setShowModal, task }) {
  const refCloseModal = useRef();
  const [time, setTime] = useState("");
  const [day, setDay] = useState();
  const { alertState, enableAlert, setEnableAlert, displayAlert } =
    useDisplayAlert();

  const addNotification = async () => {
    if (time === "" || !time) {
      displayAlert("error", "Please select a time for the notification");
      return;
    }
    if (day === "" || !day) {
      displayAlert("error", "Please select a day for the notification");
      return;
    }
    const date = `${day}T${time}`;
    console.log("date:", date);

    const notifPermission = await Notification.requestPermission();
    if (notifPermission === "default" || notifPermission === "denied") {
      displayAlert(
        "error",
        "Please allow notifications for this app in order to receive reminders."
      );
      return;
    }
    const now = new Date();
    const reminderDate = new Date(date);
    const diff = reminderDate - now;

    console.log("diff:", diff);
    console.log("reminderDate:", reminderDate);

    if (diff > 0) {
      displayAlert("success", `Reminder created to ${day} at ${time}`);
    }

    setTimeout(() => {
      new Notification("Todolify Reminder", {
        body: `This is a reminder to: "${task}"`,
      });
    }, diff);
  };

  // Subscribe to the registered service worker
  async function subscribeToSW() {
    const publicVapidKey =
      "BFt1wp7hs6lZu_zeV59YpHaBKADr4mQal6pYJz-PqkIJM-ybL8nWaeTSfDpQAivuYx65cvyQ1o33uW3rJYSbfYs";

    const registeredWorker = await navigator.serviceWorker.ready;

    let subscription = null;
    try {
      subscription = await registeredWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey,
      });
    } catch (err) {
      console.error(err);
    }

    if (!subscription)
      return alert("Error occured while creating a notification");
    console.log("subscription:", subscription);

    return subscription;
  }

  async function pushSubscriptionToServer(sub) {
    await axios.post(
      "/api/user/subscribe",
      {
        subscription: JSON.stringify(sub),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Push notification sent");
  }

  async function registerSW() {
    // Asking for permission to display notifications
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    try {
      const sw = await navigator.serviceWorker.register("/service-worker.js");
      console.log("sw:", sw);
      console.log("Service worker registered");
    } catch (err) {
      console.error(err);
    }
  }

  const webPushAPINotificationCall = async () => {
    // Register a service worker
    await registerSW();

    // Subscribe to the registered service worker
    const subscription = await subscribeToSW();

    // Send Push Subscription to the server-side
    await pushSubscriptionToServer(subscription);
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
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white px-3 shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Create a Reminder</h3>

              <button
                className="float-right ml-auto bg-transparent p-1 text-xl font-semibold text-black opacity-5"
                onClick={() => setShowModal(false)}
              />
            </div>

            <AnimatePresence>
              {enableAlert && (
                <Alert
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  type={alertState.type}
                  message={alertState.message}
                  setEnableAlert={setEnableAlert}
                />
              )}
            </AnimatePresence>

            <form className="p-5">
              <div className="flex items-center justify-between border p-6">
                <label
                  className="text-md mb-2 mr-3 block font-bold text-gray-700"
                  htmlFor="reminder time"
                >
                  Which day:
                </label>

                <input type="date" onChange={(e) => setDay(e.target.value)} />
              </div>

              <div className="flex items-center justify-between border p-6">
                <label
                  className="text-md mb-2 mr-3 block font-bold text-gray-700"
                  htmlFor="reminder time"
                >
                  Remind me at:
                </label>

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </form>
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              <button
                className="mr-3 mb-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                type="button"
                onClick={webPushAPINotificationCall}
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
