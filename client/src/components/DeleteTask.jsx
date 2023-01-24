import React from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deleteTaskAsync } from "../redux/todosSlice";

function DeleteTask({ user_id, category_id, day, month_year, dayWtData, id }) {
  const dispatch = useDispatch();

  const handleDeleteTask = async () => {
    try {
      dispatch(
        deleteTaskAsync({
          user_id,
          category_id,
          day,
          month_year,
          dayWtData,
          id,
        })
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <button
      className="hidden group-hover:inline rounded-full"
      onClick={() => handleDeleteTask()}
    >
      <GrFormClose />
    </button>
  );
}

export default DeleteTask;
