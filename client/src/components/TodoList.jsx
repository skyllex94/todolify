import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addCategoryAsync } from "../redux/categorySlice";

const TodoList = ({ userTodoList, user_id }) => {
  // const jwt = useSelector((state) => state.auth.jwt);
  // const categories = useSelector((state) => state.category);

  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [categoryInput, setCategoryInput] = useState(false);

  const addCategory = (e) => {
    e.preventDefault();
    console.log(user_id);
    if (category) dispatch(addCategoryAsync({ user_id, category }));
    setCategory("");
  };

  return (
    <div className="flex ml-5">
      <div className="rounded-lg shadow-lg bg-white pr-5 max-w-sm">
        <ul className="list-group mb-2 pt-5 ">
          {userTodoList &&
            userTodoList.map((curr, index) => (
              <div className="brackets min-w-[93%]" key={index}>
                <CategoryItem
                  categoryId={curr._id}
                  category={curr.category}
                  tasks={curr.tasks}
                />
              </div>
            ))}

          <form onSubmit={addCategory} className="flex items-center mb-5">
            <button
              onClick={addCategory}
              className="bg-transparent ml-4 text-red-700 font-semibold hover:text-black py-2 px-2"
            >
              <AiOutlinePlus />
            </button>
            <input
              type="text"
              autoFocus
              placeholder="Add Category..."
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              onBlur={() => setCategoryInput(false)}
              className="text-black-500 ml-3 h-12 focus:outline-none pl-5 pr-5 rounded-lg border border-gray-300 focus:shadow focus:outline-none block"
            />
          </form>
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
