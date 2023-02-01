import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import EventInfoModal from "./EventInfoModal";
import { motion } from "framer-motion";
import { MdPersonRemove } from "react-icons/md";

function CalendarDay({ day, events, addEventModal }) {
  const { $D } = day;
  const [addEventButton, setAddEventButton] = useState("hidden");
  const [showEventInfoModal, setShowInfoEventModal] = useState(false);

  const [eventInfo, setEventInfo] = useState({ name: "", notes: "" });

  function openEventInfo(name, notes) {
    setShowInfoEventModal(true);
    setEventInfo({ name, notes });
  }

  function removeEvent(event, idx) {
    console.log(event, idx);
    console.log(day.$D);
    // Start here: I need day and month
  }

  return (
    <div
      onMouseEnter={() => {
        setAddEventButton("block");
      }}
      onMouseLeave={() => {
        setAddEventButton("hidden");
      }}
      className="h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden"
    >
      <div className="flex justify-between">
        <div className="flex text-red-500">{$D}</div>
        <div
          onClick={() => addEventModal(day)}
          className={`flex ${addEventButton} text-red-500`}
        >
          <FiPlusCircle />
        </div>
      </div>
      <div className="top h-5 w-full">
        {events &&
          events.map((curr, idx) => {
            return (
              <div className="flex mb-1 text-gray-500" key={idx}>
                <motion.button
                  initial={{ scale: 1 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#fff",
                  }}
                  whileTap={{
                    scale: 0.9,
                    rotate: 15,
                  }}
                  transition={{
                    type: "spring",
                    damping: 10,
                    mass: 0.75,
                    stiffness: 100,
                  }}
                  onClick={() => openEventInfo(curr.event, curr.notes)}
                  className="relative flex w-full justify-between px-2 rounded border border-red-200 text-sm font-medium"
                >
                  <div className="text-gray-700 mr-3">{curr.event}</div>
                </motion.button>
                <div
                  onClick={() => removeEvent(curr.event, idx)}
                  className="text-gray-700"
                >
                  <MdPersonRemove />
                </div>
              </div>
            );
          })}
      </div>
      {showEventInfoModal && (
        <EventInfoModal
          eventInfo={eventInfo}
          setShowInfoEventModal={setShowInfoEventModal}
        />
      )}
    </div>
  );
}

export default CalendarDay;
