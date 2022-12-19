import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryAsync } from "../redux/categorySlice";
import loader from "../assets/loader.gif";

const TodoList = ({ user_id }) => {
  const dispatch = useDispatch();
  const [addCategoryValue, setAddCategoryValue] = useState("");

  // Redux state for todo list of auth user
  const todoList = useSelector((state) => state.category);

  // loader gif state
  const [loadedTodos, setLoadedTodos] = useState(false);

  // Change the loader to the data when inputted
  useEffect(() => {
    if (todoList) setLoadedTodos(true);
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();

    if (addCategoryValue) {
      try {
        // Add the new category and update the state to include it
        dispatch(addCategoryAsync({ user_id, category: addCategoryValue }));
      } catch (err) {
        console.log(err.message);
      }
    }
    setAddCategoryValue("");
  };

  return (
    <div className="flex ml-5">
      <div className="rounded-lg shadow-lg bg-white pr-5 max-w-sm">
        <ul className="list-group mb-2 pt-5 ">
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

          <form onSubmit={addCategory} className="flex items-center mb-5">
            <div className="bg-transparent ml-4 text-red-700 font-semibold hover:text-black py-2 px-2">
              <AiOutlinePlus />
            </div>
            <input
              type="text"
              autoFocus
              placeholder="Add Category..."
              value={addCategoryValue}
              onChange={(event) => setAddCategoryValue(event.target.value)}
              // onBlur={() => setCategoryInput(false)}
              className="text-black-500 ml-3 h-12 focus:outline-none pl-5 pr-5 rounded-lg border border-gray-300 focus:shadow focus:outline-none block"
            />
          </form>
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
