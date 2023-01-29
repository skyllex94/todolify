import React from "react";
import AddEventModal from "./AddEventModal";

function CalendarDay({ day, showModal, setShowModal }) {
  const { $D } = day;

  // Start from here: Figure out a way to get the dim backdrop of the modal

  return (
    <React.Fragment>
      <div className="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
        <div className="top h-5 w-full">
          <div className="text-gray-500">{$D}</div>
        </div>
      </div>

      {showModal && <AddEventModal setShowModal={setShowModal} />}
    </React.Fragment>
  );
}

export default CalendarDay;
