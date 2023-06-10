import React, { useState, Fragment } from "react";
import EditTask from "./EditTask";
import NotificationsModal from "../Modals/NotificationsModal";
import ToggleTask from "./ToggleTask";

import { Dropdown } from "flowbite-react";
import {
  MdDriveFileRenameOutline,
  MdNotificationsNone,
  MdDeleteOutline,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTaskAsync } from "../../redux/todosSlice";

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

  const dispatch = useDispatch();

  const handleDeleteTask = async () => {
    try {
      dispatch(
        deleteTaskAsync({
          user_id,
          category_id,
          day,
          month_year,
          id,
        })
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const openNotificationsModal = () => {
    setShowModal(true);
  };

  const taskOptions = (
    <div className="task-options text-white">
      <Dropdown inline>
        <Dropdown.Item
          onClick={() => setEnableEdit((prevState) => !prevState)}
          icon={MdDriveFileRenameOutline}
        >
          Rename
        </Dropdown.Item>
        <Dropdown.Item
          icon={MdNotificationsNone}
          onClick={openNotificationsModal}
        >
          Reminder
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() => handleDeleteTask()}
          icon={MdDeleteOutline}
        >
          Delete
        </Dropdown.Item>
      </Dropdown>
    </div>
  );

  return (
    <Fragment>
      <div className="flex items-center justify-between text-left">
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
          task
        )}
      </div>

      {taskOptions}

      {showModal && (
        <NotificationsModal setShowModal={setShowModal} task={task} />
      )}
    </Fragment>
  );
};

export default TaskItem;
