import React, { useState } from "react";
import DoneTasks from "./DoneTasks";
import TaskItem from "./TaskItem";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";
import AddTask from "./AddTask";
import EnableEditCategory from "./EnableEditCategory";

import { Tooltip } from "flowbite-react/lib/cjs/components";
import { HiCode } from "react-icons/hi";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoMdBusiness } from "react-icons/io";

function CategoryItem({
  user_id,
  category_id,
  category_index,
  category,
  tasks,
}) {
  const [enableEdit, setEnableEdit] = useState(false);
  const [icon, setIcon] = useState(<HiCode />);
  const icons = [<HiCode />, <MdOutlineAddBusiness />, <IoMdBusiness />];

  function hangleChangeIcon(newIcon) {
    setIcon(newIcon);
  }

  const popover = (
    <div className="flex mr-2 mt-1">
      <Tooltip
        arrow={false}
        style="light"
        content={
          <div>
            <h3 className="text-center">Change Icon</h3>
            <div className="flex">
              {icons.map((icon) => (
                <button
                  className="border-none"
                  onClick={() => hangleChangeIcon(icon)}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        }
        trigger="click"
      >
        <button className="border-none">{icon}</button>
      </Tooltip>
    </div>
  );

  return (
    <ul className={`list-group`}>
      <div className="flex categories items-center justify-between">
        <div className="flex items-center text-left">
          {popover}
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
