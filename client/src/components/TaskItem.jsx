import React from "react";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTaskAsync } from "../redux/categorySlice";
// UI Element Imports
import { GrFormClose } from "react-icons/gr";

const TaskItem = ({ user_id, category_id, id, task, done }) => {
  const dispatch = useDispatch();

  const handleCheckboxClick = () => {
    dispatch(toggleTask({ category_id, id, done: !done }));
  };

  const handleDelete = () => {
    dispatch(deleteTaskAsync({ user_id, category_id, id }));
  };

  return (
    <li className={`list-group-item ${done && "list-group-item-success"}`}>
      <div className="flex items-center mb-1 justify-between group">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mx-3"
            onClick={handleCheckboxClick}
            defaultChecked={done}
          />
          {task}
        </div>
        <button
          className="ml-3 p-1 hidden group-hover:block rounded-full"
          onClick={handleDelete}
        >
          <GrFormClose />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
