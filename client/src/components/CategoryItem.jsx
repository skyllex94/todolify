import React, { useState } from "react";
import { HiCode } from "react-icons/hi";
import DoneTasks from "./DoneTasks";
import TaskItem from "./TaskItem";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";
import AddTask from "./AddTask";
import EnableEditCategory from "./EnableEditCategory";

function CategoryItem({
  user_id,
  category_id,
  category_index,
  category,
  tasks,
}) {
  const [enableEdit, setEnableEdit] = useState(false);

  return (
    <ul className={`list-group`}>
      <div className="flex categories items-center justify-between">
        <div className="flex items-center text-left">
          <HiCode className="mr-2" />
          {enableEdit ? (
            <EditCategory
              user_id={user_id}
              category_index={category_index}
              setEnableEdit={setEnableEdit}
              category={category}
            />
          ) : (
            category
          )}
        </div>

        <div className="wrapper-right-elements flex inline">
          <EnableEditCategory setEnableEdit={setEnableEdit} />
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
        <AddTask user_id={user_id} category_id={category_id} />
      </div>
    </ul>
  );
}

export default CategoryItem;
