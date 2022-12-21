import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleCompletedTaskAsync } from "../redux/todosSlice";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";

const TaskItem = ({
  user_id,
  category_id,
  category_index,
  id,
  task,
  task_index,
  done,
}) => {
  const dispatch = useDispatch();

  const [updatedValue, setUpdatedValue] = useState("here we goo!");

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
  };

  return (
    <React.Fragment>
      <div className="flex items-center text-left">
        <input
          id="red-checkbox"
          type="checkbox"
          className="accent-orange-600 mx-3"
          onChange={toggleCompletedTask}
          checked={done}
        />

        {task}
      </div>

      <div className="flex item-center">
        <EditTask
          user_id={user_id}
          category_index={category_index}
          task_index={task_index}
          newValue={updatedValue}
        />
        <DeleteTask user_id={user_id} category_id={category_id} id={id} />
      </div>
    </React.Fragment>
  );
};

export default TaskItem;
