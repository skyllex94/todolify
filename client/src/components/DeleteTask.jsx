import React from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deleteTaskAsync } from "../redux/categorySlice";

function DeleteTask({ user_id, category_id, id, setTaskList }) {
  const dispatch = useDispatch();

  const handleDeleteTask = async () => {
    try {
      const deletedTask = await dispatch(
        deleteTaskAsync({ user_id, category_id, id })
      );

      const deletedTaskId = deletedTask.payload.data.taskToDeleteId;

      // Remove task from the state wt filter
      if (deletedTaskId) {
        setTaskList((prevState) =>
          prevState.filter((curr) => curr._id !== deletedTaskId)
        );
      }
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
