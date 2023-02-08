import React from "react";

function CompletedGoals({ goals }) {
  const completed = goals.filter((curr) => curr.done === true);

  return (
    <div className="flex border-t-2 items-center justify-between ml-5 pt-3 pb-4">
      <div>
        <i>Completed Goals:</i>
      </div>
      <div>
        {completed.length || 0}/{goals.length}
      </div>
    </div>
  );
}

export default CompletedGoals;
