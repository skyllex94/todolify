import React from "react";
// UI Elements
import { HiCode } from "react-icons/hi";
// Components
import DoneTasks from "./DoneTasks";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";

function CategoryItem({ user_id, categoryId, category, tasks }) {
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
        {tasks.map((curr, index) => {
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
        <AddTaskForm
          user_id={user_id}
          categoryId={categoryId}
          category={category}
        />
      </div>
    </ul>
  );
}

export default CategoryItem;
