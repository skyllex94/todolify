import React, { useEffect, useState } from "react";
// UI Elements
import { HiCode } from "react-icons/hi";
// Components
import DoneTasks from "./DoneTasks";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import { useDispatch } from "react-redux";
import { addTaskAsync } from "../redux/categorySlice";

function CategoryItem({ user_id, categoryId, category, tasks }) {
  const [taskList, setTaskList] = useState(tasks);

  const [task, setTask] = useState("");
  const [enableAddTask, setEnableAddTask] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (task) {
      const result = await dispatch(
        addTaskAsync({ user_id, categoryId, category, task })
      );
      // setTaskList(result.payload.data.categories);
    }
    setTask("");
  };

  return (
    <ul className={`list-group`}>
      <div className="flex categories items-center justify-between">
        <div className="flex items-center">
          <HiCode className="mr-2 " />
          {category}
        </div>

        <DoneTasks tasks={tasks} />
      </div>

      <div className="items-center my-1">
        {taskList &&
          taskList.map((curr, index) => {
            const { id, task, done } = curr;
            return (
              <TaskItem
                key={index}
                categoryId={categoryId}
                id={id}
                task={task}
                done={done}
              />
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
                        value={task}
                        onChange={(event) => setTask(event.target.value)}
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
