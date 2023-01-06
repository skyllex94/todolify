import React, { useState } from "react";
import DoneTasks from "./DoneTasks";
import TaskItem from "./TaskItem";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";
import AddTask from "./AddTask";
import EnableEditCategory from "./EnableEditCategory";

import { HiCode } from "react-icons/hi";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoMdBusiness } from "react-icons/io";

import { Popover, OverlayTrigger, Form } from "react-bootstrap/esm";

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
    <Popover id="popover-positioned-top">
      <Popover.Header as="h3">Change Icon</Popover.Header>
      <Popover.Body>
        <div className="grid grid-cols-6 gap-2">
          {icons.map((icon) => (
            <div onClick={() => hangleChangeIcon(icon)}>{icon}</div>
          ))}
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <ul className={`list-group`}>
      <div className="flex categories items-center justify-between">
        <div className="flex items-center text-left">
          <OverlayTrigger
            trigger="click"
            key="top"
            rootClose
            placement="top-start"
            overlay={popover}
          >
            <Form.Label className="optionsStyle p-1">{icon}</Form.Label>
          </OverlayTrigger>
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
