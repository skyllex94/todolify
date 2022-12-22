import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addCategoryAsync } from "../redux/todosSlice";

function AddCategory({ user_id }) {
  const dispatch = useDispatch();
  const [addCategoryValue, setAddCategoryValue] = useState("");

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
  );
}

export default AddCategory;
