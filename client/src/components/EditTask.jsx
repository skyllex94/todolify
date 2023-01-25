import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { updateTaskAsync } from "../redux/todosSlice";

function EditTask({
  user_id,
  category_index,
  day,
  month_year,
  task_index,
  task,
  setEnableEdit,
}) {
  const dispatch = useDispatch();
  const [updatedValue, setUpdatedValue] = useState(task);

  const updateTask = (e) => {
    e.preventDefault();
    try {
      dispatch(
        updateTaskAsync({
          user_id,
          category_index,
          day,
          month_year,
          task_index,
          updatedValue,
        })
      );
      setEnableEdit(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={updateTask} className="form-inline">
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

export default EditTask;
