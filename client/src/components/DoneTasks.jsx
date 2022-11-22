import React from "react";

const DoneTasks = ({ tasks }) => {
  const completed = tasks.filter((task) => task.done === true);
  return (
    <h4 className="ml-5">
      {completed.length || 0}/{tasks.length}
    </h4>
  );
};

export default DoneTasks;
