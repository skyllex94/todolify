import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleCompletedTaskAsync } from "../redux/todosSlice";

function ToggleTask({ user_id, category_index, id, done, task_index }) {
  const dispatch = useDispatch();
  const [toggleChecked, setToggleChecked] = useState(done);

  const toggleCompletedTask = async () => {
    dispatch(
      toggleCompletedTaskAsync({
        user_id,
        category_index,
        id,
        done: !done,
        task_index,
      })
    );
    setToggleChecked((prev) => !prev);
  };

  return (
    <input
      id="red-checkbox"
      type="checkbox"
      className="accent-orange-600 mx-3"
      onChange={toggleCompletedTask}
      checked={toggleChecked}
    />
  );
}

export default ToggleTask;
