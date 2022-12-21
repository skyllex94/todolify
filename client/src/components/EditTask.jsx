import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateTaskAsync } from "../redux/todosSlice";

function EditTask({ user_id, category_index, task_index, newValue }) {
  const dispatch = useDispatch();

  const handleEditTask = async () => {
    try {
      dispatch(
        updateTaskAsync({ user_id, category_index, task_index, newValue })
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <button
      className="hidden group-hover:block rounded-full mr-1"
      onClick={() => handleEditTask()}
    >
      <AiOutlineEdit />
    </button>
  );
}

export default EditTask;
