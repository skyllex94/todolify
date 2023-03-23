import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { updateTaskAsync } from "../../redux/todosSlice";

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
        className="text-md peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-1 px-0 text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-orange-500"
      />
    </form>
  );
}

export default EditTask;
