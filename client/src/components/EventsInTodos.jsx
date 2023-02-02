import React from "react";

function EventsInTodos({ events }) {
  //   border-t-4
  return (
    <div className="brackets-events">
      <div className="ml-6 mr-4">Events</div>
      <div className="flex items-center pb-5">
        <ul className={`list-group`}>
          <div className="flex events items-center justify-between">
            <div className="wrapper-right-elements flex inline">
              {/* <DoneTasks tasks={tasks} />
                <EnableEditCategory setEnableEdit={setEnableEdit} />
    
                <DeleteCategory
                  user_id={user_id}
                  id={category_id}
                  day={day}
                  month_year={month_year}
                  dayWtData={dayWtData}
                /> */}
            </div>
          </div>

          <div className="items-center my-1">
            <div className="flex flex-col">
              {events.map((curr) => (
                <div className="flex items-center">
                  <input
                    id="red-checkbox"
                    type="checkbox"
                    className="accent-orange-600 mx-3"
                    // onChange={toggleCompletedTask}
                    // checked={toggleChecked}
                  />
                  <label>{curr.event}</label>
                </div>
              ))}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default EventsInTodos;
