import React from "react";
import { useDispatch } from "react-redux";
import { toggleCompleted, deleteTask } from "../redux/todoSlice";
// UI Element Imports
import { GrFormClose } from "react-icons/gr";

const TodoItem = ({ id, task, category, completed }) => {
  const dispatch = useDispatch();

  const handleCheckboxClick = () => {
    dispatch(toggleCompleted({ id, completed: !completed }));
  };

  const handleDelete = () => {
    dispatch(deleteTask({ id }));
  };

  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="flex items-center mb-1">
        <input
          type="checkbox"
          className="mx-3"
          onClick={handleCheckboxClick}
          defaultChecked={completed}
        />
        {task}, {category}
        <button
          class="ml-3 p-1 border hover:border-blue-500 rounded-full"
          onClick={handleDelete}
        >
          <GrFormClose color="white" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
