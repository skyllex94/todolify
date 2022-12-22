import React, { useState } from "react";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import EnableEditTask from "./EnableEditTask";
import ToggleTask from "./ToggleTask";

const TaskItem = ({
  user_id,
  category_id,
  category_index,
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
          id={id}
          done={done}
          task_index={task_index}
        />

        {enableEdit ? (
          <EditTask
            user_id={user_id}
            category_index={category_index}
            task_index={task_index}
            task={task}
            setEnableEdit={setEnableEdit}
          />
        ) : (
          task
        )}
      </div>

      <div className="flex item-center">
        <EnableEditTask setEnableEdit={setEnableEdit} />
        <DeleteTask user_id={user_id} category_id={category_id} id={id} />
      </div>
    </React.Fragment>
  );
};

export default TaskItem;
