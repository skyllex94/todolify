import React from "react";
import CategoryItem from "./CategoryItem";
import loader from "../assets/loader.gif";
import AddCategory from "./AddCategory";
import { useTodoList } from "../hooks/useTodoList";
import { useDispatch } from "react-redux";
import { addDateAsync } from "../redux/todosSlice";

const TodoList = ({
  user_id,
  todos,
  day,
  month_year,
  dayOfWeek,
  dayWtData,
}) => {
  // Hook fetching redux state for todo list of auth user
  const { loadedTodos } = useTodoList();

  const dispatch = useDispatch();
  // First adjusted DB accounting for date (day & month)
  const reachDB = () => {
    dispatch(addDateAsync({ user_id, month_year, day }));
  };

  return (
    <div className="todo-list ml-5 min-w-[20%] max-w-[20%]">
      <div className="rounded-lg shadow-lg bg-white pr-5 justify-between">
        <ul className="list-group pt-5">
          <h3 className="text-center">
            <i>{dayOfWeek}</i> - <span>{day + "/" + month_year}</span>
          </h3>
          {loadedTodos ? (
            todos.map((curr, index) => {
              return (
                <div key={index} className="flex inline mb-1">
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
            })
          ) : (
            <div className="flex items-center">
              <img
                src={loader}
                alt="loader"
                className="m-auto mb-4 h-16 w-16"
              />
            </div>
          )}

          <AddCategory
            user_id={user_id}
            day={day}
            month_year={month_year}
            dayWtData={dayWtData}
          />
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
