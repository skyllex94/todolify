import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addCategoryAsync } from "../redux/categorySlice";
import axios from "axios";

const TodoList = ({ userTodoList, user_id }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [todoList, setTodoList] = useState(userTodoList);
  const [onSubmit, setOnSubmit] = useState(null);

  const addCategory = (e) => {
    e.preventDefault();
    if (category) dispatch(addCategoryAsync({ user_id, category }));
    setCategory("");
    setOnSubmit(category);
  };

  async function getUserTodoList(id) {
    try {
      const fetchedTodoList = await axios.get(`/user/${id}`);
      console.log("fetchedTodoList:", fetchedTodoList);
      // Set the current todoList with the new updated one from adding a category
      setTodoList(fetchedTodoList.data);
    } catch (error) {
      return error.message;
    }
  }

  // Updating the UI each time there is an onSubmit, in order to fetch the array of categories
  useEffect(() => {
    // Async func for doing a GET req and fetching categories
    getUserTodoList(user_id);
    // Having an additional setState do do another re-render in order to get the last element
    setOnSubmit("additional re-render");
  }, [onSubmit, user_id]);

  return (
    <div className="flex ml-5">
      <div className="rounded-lg shadow-lg bg-white pr-5 max-w-sm">
        <ul className="list-group mb-2 pt-5 ">
          {todoList &&
            todoList.map((curr, index) => (
              <div className="brackets min-w-[93%]" key={index}>
                <CategoryItem
                  user_id={user_id}
                  categoryId={curr._id}
                  category={curr.category}
                  tasks={curr.tasks}
                />
              </div>
            ))}

          <form onSubmit={addCategory} className="flex items-center mb-5">
            <button className="bg-transparent ml-4 text-red-700 font-semibold hover:text-black py-2 px-2">
              <AiOutlinePlus />
            </button>
            <input
              type="text"
              autoFocus
              placeholder="Add Category..."
              value={category}
              onChange={(event) => setCategory(event.target.value)}
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
