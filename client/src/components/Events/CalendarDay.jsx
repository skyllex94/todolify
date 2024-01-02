import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import EventInfoModal from "../Modals/UpdateEventModal";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { removeEventAsync } from "../../redux/eventsSlice";
import { GrFormClose } from "react-icons/gr";
import { saveUserData } from "../../redux/dataSlice";

function CalendarDay({ day, events, month_year, addEventModal }) {
  // Local and global states
  const [addEventButton, setAddEventButton] = useState("hidden");
  const [showEventInfoModal, setShowInfoEventModal] = useState(false);
  const user_id = useSelector((state) => state.auth.user_id);
  const global = useSelector((state) => state.data);
  const linked_calendars = useSelector((state) =>
    JSON.parse(state.settings.linkedCalendars)
  );

  const [eventInfo, setEventInfo] = useState({
    id: "",
    idx: null,
    name: "",
    notes: "",
    google_event_id: "",
    google_start_date: "",
    google_end_date: "",
  });
  const monthIdx = getMonthIdx(month_year, global);
  const dayIdx = getDayIdx(day.$D, monthIdx, global);

  const { $D } = day;
  const dispatch = useDispatch();

  function openEventInfo(
    id,
    idx,
    name,
    notes,
    google_event_id,
    google_start_date,
    google_end_date
  ) {
    setEventInfo({
      id,
      idx,
      name,
      notes,
      google_event_id,
      google_start_date,
      google_end_date,
    });
    setShowInfoEventModal(true);
  }

  function getMonthIdx(month_year, globalState) {
    return globalState.date.findIndex((i) => i.month_year === month_year);
  }

  function getDayIdx(day, monthIdx, globalState) {
    if (monthIdx < 0) return -1;

    return globalState.date[monthIdx].days.findIndex(
      (curr) => curr.day === day
    );
  }

  async function removeEvent(event_id, google_event_id) {
    if ((monthIdx, dayIdx === null))
      return alert("Mistake fetching month and/or day index");

    if (
      window.confirm("Are you sure you want to delete this event?") === true
    ) {
      try {
        const res = await dispatch(
          removeEventAsync({
            user_id,
            day_idx: dayIdx,
            month_idx: monthIdx,
            event_id,
            google_event_id,
            linked_calendars,
          })
        );
        if (res.payload.status === 200)
          dispatch(saveUserData(res.payload.data.userTodoList));
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
      className="mx-auto h-32 w-10 overflow-hidden sm:h-36 sm:w-full md:h-36 md:w-full
      lg:h-36 lg:w-full xl:h-36 xl:w-full "
    >
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => addEventModal(day)}
      >
        <div className="flex text-red-500">{$D}</div>
        <div className={`flex ${addEventButton} text-red-500`}>
          <FiPlusCircle />
        </div>
      </div>
      <div className="top w-full">
        {events &&
          events.map((curr, idx) => {
            return (
              <div className="flex items-center text-gray-500" key={idx}>
                <motion.button
                  initial={{ scale: 1 }}
                  whileHover={{
                    scale: 1.05,
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
                    openEventInfo(
                      curr._id,
                      idx,
                      curr.event,
                      curr.notes,
                      curr.google_event_id,
                      curr.google_start_date,
                      curr.google_end_date
                    )
                  }
                  className="relative flex w-full justify-between rounded border border-red-200 px-2 text-sm font-medium"
                >
                  <div className="mr-3 text-left text-gray-700">
                    {curr.event}
                  </div>
                </motion.button>
                <div
                  onClick={() => removeEvent(curr._id, curr.google_event_id)}
                  className="cursor-pointer text-gray-700"
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
