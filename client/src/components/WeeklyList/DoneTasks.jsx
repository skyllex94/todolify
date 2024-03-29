import React, { useEffect } from "react";

const DoneTasks = ({ tasks, setCategoryCompleted }) => {
  const completed = tasks.filter((task) => task.done === true);

  useEffect(() => {
    if (tasks.length > 0 && completed.length === tasks.length)
      setCategoryCompleted(true);
    else setCategoryCompleted(false);
  }, [completed.length, tasks.length, setCategoryCompleted]);

  return (
    <React.Fragment>
      <h4 className="pr-2">
        {completed.length || 0}/{tasks.length}
      </h4>
    </React.Fragment>
  );
};

export default DoneTasks;
