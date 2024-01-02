import React from "react";
import CategoryItem from "./CategoryItem";
import AddCategory from "./AddCategory";
import EventsInTodos from "./EventsInTodos";

const TodoList = ({
  user_id,
  todos,
  events,
  day,
  month_year,
  dayOfWeek,
  dayWtData,
}) => {
  return (
    <div className="todo-list ml-5 min-w-[16%]">
      <div className="justify-between rounded-lg bg-white pr-5 shadow-lg">
        <ul className="list-group pt-5">
          <h3 className="text-center">
            <i>{dayOfWeek}</i> - <span>{day + "/" + month_year}</span>
          </h3>
          {todos.map((curr, index) => {
            return (
              <div key={index} className="flex">
                <div className="brackets min-w-[93%]">
                  <CategoryItem
                    user_id={user_id}
                    day={day}
                    month_year={month_year}
                    category_id={curr._id}
                    category_index={index}
                    category={curr.category}
                    tasks={curr.tasks}
                    icon={curr.icon}
                    dayWtData={dayWtData}
                  />
                </div>
              </div>
            );
          })}

          <AddCategory
            user_id={user_id}
            day={day}
            month_year={month_year}
            dayWtData={dayWtData}
          />

          {events && (
            <EventsInTodos events={events} day={day} month_year={month_year} />
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
