import React from "react";
import { useDispatch } from "react-redux";
import { toggleCompletedTaskAsync } from "../redux/categorySlice";
import DeleteTask from "./DeleteTask";

const TaskItem = ({
  user_id,
  category_id,
  category_index,
  id,
  task,
  task_index,
  done,
  setTaskList,
}) => {
  const dispatch = useDispatch();

  const toggleCompletedTask = async () => {
    const resp = await dispatch(
      toggleCompletedTaskAsync({
        user_id,
        category_id,
        category_index,
        id,
        task_index,
      })
    );
    console.log("resp:", resp);
  };

  return (
    <React.Fragment>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mx-3"
          onClick={toggleCompletedTask}
          defaultChecked={done}
        />
        {task}
      </div>

      <DeleteTask
        user_id={user_id}
        category_id={category_id}
        id={id}
        setTaskList={setTaskList}
      />
    </React.Fragment>
  );
};

export default TaskItem;
