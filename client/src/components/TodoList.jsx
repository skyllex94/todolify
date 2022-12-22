import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { useSelector } from "react-redux";
import loader from "../assets/loader.gif";
import AddCategory from "./AddCategory";

const TodoList = ({ user_id }) => {
  // Redux state for todo list of auth user
  const todoList = useSelector((state) => state.todos);

  // loader gif state
  const [loadedTodos, setLoadedTodos] = useState(false);

  // Change the loader to the data when inputted
  useEffect(() => {
    if (todoList) setLoadedTodos(true);
  }, []);

  return (
    <div className="flex ml-5">
      <div className="rounded-lg shadow-lg bg-white pr-5 max-w-sm">
        <ul className="list-group mb-2 pt-5">
          {loadedTodos ? (
            todoList.map((curr, index) => (
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
