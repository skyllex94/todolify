import React from "react";

function CompletedGoals({ goals }) {
  const completed = goals.filter((curr) => curr.done === true);

  return (
    <div className="ml-5 flex items-center justify-between border-t-2 pt-3 pb-4">
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
