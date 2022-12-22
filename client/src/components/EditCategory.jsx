import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCategoryAsync } from "../redux/todosSlice";

function EditCategory({ user_id, category_index, setEnableEdit, category }) {
  const dispatch = useDispatch();
  const [updatedValue, setUpdatedValue] = useState(category);

  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateCategoryAsync({ user_id, category_index, updatedValue })
      );
      setEnableEdit(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={updateCategory} className="form-inline">
      <input
        type="text"
        autoFocus
        value={updatedValue}
        onChange={(event) => setUpdatedValue(event.target.value)}
        onBlur={() => setEnableEdit(false)}
        className="block py-1 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
      />
    </form>
  );
}

export default EditCategory;
