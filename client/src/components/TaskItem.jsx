import React, { useState } from "react";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import EnableEditTask from "./EnableEditTask";
import PushToNextDay from "./PushToNextDay";
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

  return (
    <React.Fragment>
      <div className="flex items-center text-left">
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

      <div className="flex">
        <EnableEditTask setEnableEdit={setEnableEdit} />
        <DeleteTask
          user_id={user_id}
          category_id={category_id}
          id={id}
          day={day}
          month_year={month_year}
        />
      </div>
    </React.Fragment>
  );
};

export default TaskItem;
