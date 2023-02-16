import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskAsync } from "../redux/todosSlice";

function AddTask({
  user_id,
  category_id,
  category_index,
  day,
  month_year,
  dayWtData,
}) {
  const dispatch = useDispatch();
  const [addTaskValue, setAddTaskValue] = useState("");
  const [enableAddTask, setEnableAddTask] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (addTaskValue) {
      try {
        // Dispatch addingTask async and return an object from DB wt new id,
        // task name and done keys
        dispatch(
          addTaskAsync({
            user_id,
            category_id,
            category_index,
            task: addTaskValue,
            day,
            month_year,
            dayWtData,
          })
        );
      } catch (err) {
        console.log(err.message);
      }
    }
    setAddTaskValue("");
  };

  return (
    <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
      <div className="flex items-center">
        {!enableAddTask && (
          <span
            onClick={() => setEnableAddTask(true)}
            className="add-task-label ml-3 text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-gray-600 bg-gray-200 uppercase last:mr-0 mr-1"
          >
            Add Task
          </span>
        )}
        {enableAddTask && (
          <div className="flex">
            <div>
              <div className="flex items-center">
                <div className="relative">
                  <div>
                    <i className="fa fa-search text-white z-20 hover:text-gray-500" />
                  </div>
                  <input
                    type="text"
                    autoFocus
                    placeholder="Add Task..."
                    value={addTaskValue}
                    onChange={(event) => setAddTaskValue(event.target.value)}
                    onBlur={() => setEnableAddTask(false)}
                    className="text-black-500 ml-3 w-60 h-12 focus:outline-none pl-10 pr-5 
                    rounded-lg border border-gray-300 focus:shadow focus:outline-none block"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default AddTask;
