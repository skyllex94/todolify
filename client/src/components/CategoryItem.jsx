import React, { useState } from "react";
// UI Elements
import { HiCode } from "react-icons/hi";
// Components
import DoneTasks from "./DoneTasks";
import TaskItem from "./TaskItem";
import { useDispatch } from "react-redux";
import { addTaskAsync } from "../redux/categorySlice";
import DeleteCategory from "./DeleteCategory";

function CategoryItem({
  user_id,
  category_id,
  category_index,
  category,
  tasks,
}) {
  const [addTaskValue, setAddTaskValue] = useState("");
  const [enableAddTask, setEnableAddTask] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (addTaskValue) {
      try {
        // Dispatch addingTask async and return an object from DB wt new id, task name and done keys
        dispatch(addTaskAsync({ user_id, category_id, task: addTaskValue }));
      } catch (err) {
        console.log(err.message);
      }
    }
    setAddTaskValue("");
  };

  return (
    <ul className={`list-group`}>
      <div className="flex categories items-center justify-between">
        <div className="flex items-center">
          <HiCode className="mr-2 " />
          {category}
        </div>

        <div className="wrapper-right-elements flex inline">
          <DeleteCategory user_id={user_id} id={category_id} />
          <DoneTasks tasks={tasks} />
        </div>
      </div>

      <div className="items-center my-1">
        {tasks &&
          tasks.map((curr, index) => {
            const { _id, task, done } = curr;

            return (
              <div
                className="flex items-center mb-1 justify-between group"
                key={index}
              >
                <TaskItem
                  user_id={user_id}
                  category_id={category_id}
                  category_index={category_index}
                  id={_id}
                  task={task}
                  task_index={index}
                  done={done}
                />
              </div>
            );
          })}
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
                        <i className="fa fa-search text-white z-20 hover:text-gray-500"></i>
                      </div>
                      <input
                        type="text"
                        autoFocus
                        placeholder="Add Task..."
                        value={addTaskValue}
                        onChange={(event) =>
                          setAddTaskValue(event.target.value)
                        }
                        onBlur={() => setEnableAddTask(false)}
                        className="text-black-500 ml-3 h-12 focus:outline-none pl-10 pr-5 rounded-lg border border-gray-300 focus:shadow focus:outline-none block"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </ul>
  );
}

export default CategoryItem;
