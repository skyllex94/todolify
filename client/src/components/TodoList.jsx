import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addCategoryAsync } from "../redux/categorySlice";
import axios from "axios";

const TodoList = ({ userTodoList, user_id }) => {
  // const jwt = useSelector((state) => state.auth.jwt);
  // const categories = useSelector((state) => state.category);

  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  // const [, setCategoryInput] = useState(false)
  const [todoList, setTodoList] = useState(userTodoList);
  const [stateChange, setStateChange] = useState("");

  const addCategory = (e) => {
    e.preventDefault();
    console.log(user_id);
    if (category) dispatch(addCategoryAsync({ user_id, category }));
    setCategory("");
    setStateChange(category);
    // getUserTodoList(user_id);
  };

  async function getUserTodoList(id) {
    try {
      const fetchedTodoList = await axios.get(`/user/${id}`);
      console.log(fetchedTodoList.data);
      setTodoList(fetchedTodoList.data);
    } catch (error) {
      return error.message;
    }
  }

  // useEffect(() => {
  //   getUserTodoList(user_id);
  // }, [addCategory, stateChange, user_id]);

  return (
    <div className="flex ml-5">
      <div className="rounded-lg shadow-lg bg-white pr-5 max-w-sm">
        <ul className="list-group mb-2 pt-5 ">
          {todoList &&
            todoList.map((curr, index) => (
              <div className="brackets min-w-[93%]" key={index}>
                <CategoryItem
                  categoryId={curr._id}
                  category={curr.category}
                  tasks={curr.tasks}
                />
              </div>
            ))}

          <form onSubmit={addCategory} className="flex items-center mb-5">
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
