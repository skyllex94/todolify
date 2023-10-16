import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTaskAsync } from "../../redux/todosSlice";

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

  // Update checkmark if state changed
  useEffect(() => {
    setToggleChecked(done);
  }, [done]);

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
      className="mx-3 h-4 w-4 cursor-pointer rounded border-gray-200 bg-gray-100 text-orange-600 focus:ring-2 
            focus:ring-orange-600 dark:border-gray-100 dark:bg-gray-600 dark:ring-offset-gray-200 
            dark:focus:ring-orange-600"
    />
  );
}

export default ToggleTask;
