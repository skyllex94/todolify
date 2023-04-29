import React from "react";
import { useDispatch } from "react-redux";
import { deleteTaskAsync } from "../../redux/todosSlice";

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
      // className="delete_button absolute hidden group-hover:inline"
      onClick={() => handleDeleteTask()}
    >
      Delete
    </button>
  );
}

export default DeleteTask;
