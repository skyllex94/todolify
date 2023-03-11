import React from "react";
import { useSelector } from "react-redux";
import AddYearlyGoal from "./AddYearlyGoal";
import CompletedGoals from "./CompletedGoals";
import GoalItem from "./GoalItem";

function GoalsList({ user_id }) {
  const localData = useSelector((state) => state.data);

  return (
    localData &&
    localData.goals.map((yearlyGoals, idx) => (
      <div key={idx} className="flex pt-24">
        <div className="todo-list ml-5 w-80">
          <div className="rounded-lg bg-white pr-5 shadow-lg">
            <ul className="list-group pt-5">
              <h3 className="mb-5 text-center">
                <span>
                  <b>Year {yearlyGoals.year}</b>
                </span>
              </h3>

              {yearlyGoals.list.map((curr, index) => {
                return (
                  <GoalItem
                    key={index}
                    user_id={user_id}
                    curr={curr}
                    year_idx={idx}
                    goal_idx={index}
                    localData={localData}
                  />
                );
              })}

              <AddYearlyGoal localData={localData} year={yearlyGoals.year} />

              <CompletedGoals
                year_idx={idx}
                goals={yearlyGoals.list}
                local_data={localData}
              />
            </ul>
          </div>
        </div>
      </div>
    ))
  );
}

export default GoalsList;
