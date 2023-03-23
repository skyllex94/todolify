import React, { useState } from "react";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import EnableEditTask from "./EnableEditTask";
import NotificationsModal from "../Modals/NotificationsModal";
import ToggleTask from "./ToggleTask";

const TaskItem = ({
  user_id,
  category_id,
  category_index,
  day,
  month_year,
  id,
  task,
  task_index,
  done,
}) => {
  const [enableEdit, setEnableEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openNotificationsModal = () => {
    setShowModal(true);
  };

  return (
    <React.Fragment>
      <div className="flex items-center justify-center text-left">
        <ToggleTask
          user_id={user_id}
          category_index={category_index}
          day={day}
          month_year={month_year}
          id={id}
          done={done}
          task_index={task_index}
        />

        {enableEdit ? (
          <EditTask
            user_id={user_id}
            category_index={category_index}
            day={day}
            month_year={month_year}
            task_index={task_index}
            task={task}
            setEnableEdit={setEnableEdit}
          />
        ) : (
          <button className="task_button" onClick={openNotificationsModal}>
            {task}
          </button>
        )}
      </div>

      <div>
        <div className="bg_buttons_hover absolute mx-3 hidden bg-white text-white group-hover:inline">
          I
        </div>

        <EnableEditTask setEnableEdit={setEnableEdit} />
        <DeleteTask
          user_id={user_id}
          category_id={category_id}
          id={id}
          day={day}
          month_year={month_year}
        />
      </div>

      {showModal && (
        <NotificationsModal setShowModal={setShowModal} task={task} />
      )}
    </React.Fragment>
  );
};

export default TaskItem;
