import React from "react";

function CalendarDay({ day, events }) {
  const { $D } = day;
  let list = null;
  if (events) {
    const { eventList } = events;
    console.log("eventList:", eventList);
    list = eventList;
  }

  return (
    <div>
      <div className="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
        <div className="top h-5 w-full">
          <div className="flex text-gray-500">{$D}</div>
          <div className="flex">
            {list &&
              list.map((curr, idx) => {
                return (
                  <div className="text-gray-500" key={idx}>
                    <button
                      // onClick={() => alert("Clicked")}
                      className="relative inline-flex items-center px-2 rounded border border-gray-200 text-sm font-medium"
                    >
                      <p className="text-gray-700">{curr.event}</p>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarDay;
