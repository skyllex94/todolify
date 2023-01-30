import React from "react";

function CalendarDay({ day }) {
  const { $D } = day;

  return (
    <div>
      <div className="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
        <div className="top h-5 w-full">
          <div className="text-gray-500">{$D}</div>
        </div>
      </div>
    </div>
  );
}

export default CalendarDay;
