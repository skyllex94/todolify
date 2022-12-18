import React from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deleteTaskAsync } from "../redux/categorySlice";

function DeleteTask({ user_id, category_id, id }) {
  const dispatch = useDispatch();

  const handleDeleteTask = async () => {
    try {
      dispatch(deleteTaskAsync({ user_id, category_id, id }));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <button
      className="ml-3 hidden group-hover:block rounded-full"
      onClick={() => handleDeleteTask()}
    >
      <GrFormClose />
    </button>
  );
}

export default DeleteTask;
