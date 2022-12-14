import React from "react";
import CategoryItem from "./CategoryItem";
import loader from "../assets/loader.gif";
import AddCategory from "./AddCategory";
import { useTodoList } from "../hooks/useTodoList";
import { formattedDate, getDayOfWeek } from "../utils/functions";

const TodoList = ({ user_id, todos, day }) => {
  // Hook fetching redux state for todo list of auth user
  const { loadedTodos } = useTodoList();

  const formatDate = formattedDate(day);
  const dayOfWeek = getDayOfWeek(day);

  return (
    <div className="flex ml-5">
      <div className="rounded-lg shadow-lg bg-white pr-5 max-w-sm">
        <ul className="list-group mb-2 pt-5">
          <h3 className="text-center">
            <i>{dayOfWeek}</i> - <span>{formatDate}</span>
          </h3>
          {loadedTodos ? (
            todos.map((curr, index) => (
              <div
                key={index}
                className="flex inline items-center mb-1 justify-between"
              >
                <div className="brackets min-w-[93%]">
                  <CategoryItem
                    user_id={user_id}
                    category_id={curr._id}
                    category_index={index}
                    category={curr.category}
                    tasks={curr.tasks}
                    icon={curr.icon}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center">
              <img
                src={loader}
                alt="loader"
                className="m-auto mb-4 h-16 w-16"
              />
            </div>
          )}

          <AddCategory user_id={user_id} />
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
