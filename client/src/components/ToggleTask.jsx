import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTaskAsync } from "../redux/todosSlice";

function ToggleTask({
  user_id,
  category_index,
  day,
  month_year,
  id,
  done,
  task_index,
}) {
  const dispatch = useDispatch();
  const [toggleChecked, setToggleChecked] = useState(done);

  const toggleCompletedTask = async () => {
    dispatch(
      toggleTaskAsync({
        user_id,
        category_index,
        day,
        month_year,
        id,
        done: !done,
        task_index,
      })
    );

    setToggleChecked((prev) => !prev);
  };

  return (
    <input
      id="orange-checkbox"
      type="checkbox"
      onChange={toggleCompletedTask}
      checked={toggleChecked}
      className="w-4 cursor-pointer h-4 mx-3 text-orange-600 bg-gray-100 border-gray-200 rounded focus:ring-orange-600 
            dark:focus:ring-orange-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-600 
            dark:border-gray-100"
    />
  );
}

export default ToggleTask;
