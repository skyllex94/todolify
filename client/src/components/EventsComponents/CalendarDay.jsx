import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import EventInfoModal from "./UpdateEventModal";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { removeEventAsync } from "../../redux/eventsSlice";
import { GrFormClose } from "react-icons/gr";

function CalendarDay({ day, events, month_year, addEventModal }) {
  // Local and global states
  const [addEventButton, setAddEventButton] = useState("hidden");
  const [showEventInfoModal, setShowInfoEventModal] = useState(false);
  const user_id = useSelector((state) => state.auth.user_id);
  const global = useSelector((state) => state.events);
  const [eventInfo, setEventInfo] = useState({
    id: "",
    idx: null,
    name: "",
    notes: "",
  });
  const [monthIdx] = useState(getMonthIdx(month_year, global));
  const [dayIdx] = useState(getDayIdx(day.$D, monthIdx, global));

  const { $D } = day;
  const dispatch = useDispatch();

  function openEventInfo(id, idx, name, notes) {
    setShowInfoEventModal(true);
    setEventInfo({ id, idx, name, notes });
  }

  function getMonthIdx(month_year, globalState) {
    return globalState.date.findIndex((i) => i.month_year === month_year);
  }

  function getDayIdx(day, monthIdx, globalState) {
    return globalState.date[monthIdx].days.findIndex(
      (curr) => curr.day === day
    );
  }

  function removeEvent(event_id) {
    if ((monthIdx, dayIdx === null))
      return alert("Mistake fetching month and/or day index");

    if (
      window.confirm("Are you sure you want to delete this event?") === true
    ) {
      try {
        dispatch(
          removeEventAsync({
            user_id,
            day_idx: dayIdx,
            month_idx: monthIdx,
            event_id,
          })
        );
      } catch (err) {
        alert(err.message);
      }
    }
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
              <div className="flex mb-1 items-center text-gray-500" key={idx}>
                <motion.button
                  initial={{ scale: 1 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#fff",
                  }}
                  whileTap={{
                    scale: 0.9,
                    rotate: 5,
                  }}
                  transition={{
                    type: "spring",
                    damping: 10,
                    mass: 0.75,
                    stiffness: 100,
                  }}
                  onClick={() =>
                    openEventInfo(curr._id, idx, curr.event, curr.notes)
                  }
                  className="relative flex w-full justify-between px-2 rounded border border-red-200 text-sm font-medium"
                >
                  <div className="text-gray-700 mr-3">{curr.event}</div>
                </motion.button>
                <div
                  onClick={() => removeEvent(curr._id)}
                  className="text-gray-700"
                >
                  <GrFormClose />
                </div>
              </div>
            );
          })}
      </div>
      {showEventInfoModal && (
        <EventInfoModal
          day_idx={dayIdx}
          day={day}
          month_year={month_year}
          month_idx={monthIdx}
          eventInfo={eventInfo}
          setShowInfoEventModal={setShowInfoEventModal}
        />
      )}
    </div>
  );
}

export default CalendarDay;
