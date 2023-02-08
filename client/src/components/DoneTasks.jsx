import React, { useState } from "react";

const DoneTasks = ({ tasks, setCategoryCompleted }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const completed = tasks.filter((task) => task.done === true);
  return (
    <React.Fragment>
      <h4 className="pr-2">
        {completed.length || 0}/{tasks.length}
      </h4>

      {tasks.length > 0 &&
      completed.length === tasks.length &&
      !animationComplete
        ? setCategoryCompleted(false) && setAnimationComplete(true)
        : setCategoryCompleted(false)}
    </React.Fragment>
  );
};

export default DoneTasks;
