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
    <React.Fragment>
      <input
        id="red-checkbox"
        type="checkbox"
        className="accent-orange-600 mx-3"
        onChange={toggleCompletedTask}
        checked={toggleChecked}
      />
    </React.Fragment>
  );
}

export default ToggleTask;
