import React from "react";
import { HiCode } from "react-icons/hi";
import AddTaskForm from "./AddTaskForm";
import TaskItem from "./TaskItem";

function CategoryItem({ categoryId, category, tasks }) {
  return (
    <ul className={`list-group`}>
      <div className="flex categories items-center">
        <HiCode className="mr-2" />
        {category}
      </div>

      <div className="items-center mb-1">
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
        <AddTaskForm categoryId={categoryId} category={category} />
      </div>
    </ul>
  );
}

export default CategoryItem;
