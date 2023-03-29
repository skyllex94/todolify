import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDisplayAlert } from "../../hooks/useDisplayAlert";
import Alert from "../Alert/Alert";
// const webpush = require("web-push");

export default function NotificationsModal({ setShowModal, task }) {
  const refCloseModal = useRef();
  const [time, setTime] = useState("");
  const [day, setDay] = useState();
  const { alertState, enableAlert, setEnableAlert, displayAlert } =
    useDisplayAlert();

  // Flutter - mobile app variable
  // var isFlutterInAppWebViewReady = false;
  // window.addEventListener("flutterInAppWebViewPlatformReady", function (event) {
  //   isFlutterInAppWebViewReady = true;
  // });

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

    // if (isFlutterInAppWebViewReady) {
    //   const args = [day, time, { task: task.diff.toiosstring }];
    //   window.flutter_inappwebview.callHandler("showreminded", ...args);
    // }

    // if (isFlutterInAppWebViewReady) {
    //   const args = [day, time, { task: task, diff: diff.toISOString() }];
    //   window.flutter_inappwebview.callHandler("showreminded", ...args);
    // }
  };

  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.0/8 are considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  function register(config) {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      // The URL constructor is available in all browsers that support SW.
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

      if (publicUrl.origin !== window.location.origin) {
        // Our service worker won't work if PUBLIC_URL is on a different origin
        // from what our page is served on. This might happen if a CDN is used to
        // serve assets; see https://github.com/facebook/create-react-app/issues/2374
        return;
      }

      window.addEventListener("load", () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

        if (isLocalhost) {
          // This is running on localhost. Let's check if a service worker still exists or not.
          // checkValidServiceWorker(swUrl, config);

          // Add some additional logging to localhost, pointing developers to the
          // service worker/PWA documentation.
          navigator.serviceWorker.ready.then(() => {
            console.log(
              "This web app is being served cache-first by a service " +
                "worker. To learn more, visit https://cra.link/PWA"
            );
          });
        } else {
          // Is not localhost. Just register service worker
          registerValidSW(swUrl, config);
        }
      });
    }
  }

  function registerValidSW(swUrl) {
    // const registedWorker = await navigator.serviceWorker.register(swUrl);
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = async () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // At this point, the updated precached content has been fetched,
                // but the previous service worker will still serve the older
                // content until all client tabs are closed.

                const publicVapidKey =
                  "BFt1wp7hs6lZu_zeV59YpHaBKADr4mQal6pYJz-PqkIJM-ybL8nWaeTSfDpQAivuYx65cvyQ1o33uW3rJYSbfYs";

                console.log("Service worker registered");

                console.log("Registering a push...");
                const subscription = await register.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
                });

                console.log("Push registered");

                // Send Push Notification
                console.log("Sending push");
                await fetch("/subscribe", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(subscription),
                });

                console.log("Push notification sent");
              } else {
                console.log("Content is cached for offline use.");
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error("Error during service worker registration:", error);
      });
  }

  const webPushAPINotificationCall = async () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
    console.log("swUrl:", swUrl);

    const permission = await Notification.requestPermission();
    console.log("permission:", permission);
    if (permission !== "granted") return;

    const registeredWorker = await navigator.serviceWorker.register(swUrl);
    console.log("Service worker registered");

    const publicVapidKey =
      "BFt1wp7hs6lZu_zeV59YpHaBKADr4mQal6pYJz-PqkIJM-ybL8nWaeTSfDpQAivuYx65cvyQ1o33uW3rJYSbfYs";

    console.log("Registering a push...");
    const subscription = await registeredWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    console.log("Push registered");

    // Send Push Notification
    console.log("Sending push");
    await fetch("/subscribe", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(subscription),
    });

    console.log("Push notification sent");
  };

  // Utility function to convert a URL-safe Base64 string to a Uint8Array
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

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
                onClick={registerValidSW}
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
