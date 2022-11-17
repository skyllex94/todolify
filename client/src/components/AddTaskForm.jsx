import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/categorySlice";

const AddTaskForm = ({ categoryId, category }) => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    if (task) {
      dispatch(addTask({ categoryId, category, task }));
    }
  };

  return (
    <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Add todo..."
          value={task}
          onChange={(event) => setTask(event.target.value)}
          className="text-black-500 ml-3 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block"
        />

        <button
          type="submit"
          className="bg-blue-500 ml-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
