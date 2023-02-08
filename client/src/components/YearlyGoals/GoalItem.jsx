import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/dataSlice";
import { renameGoalAsync, toggleGoalAsync } from "../../redux/goalsSlice";

import GoalsOptions from "./GoalsOptions";

function GoalItem({ user_id, curr, year_idx, goal_idx, localData }) {
  const [enableRename, setEnableRename] = useState(false);
  const [renamedValue, setRenamedValue] = useState(curr.goal);
  const [toggleDone, setToggleDone] = useState(curr.done);

  const dispatch = useDispatch();

  const renameYearlyGoal = async (e) => {
    e.preventDefault();

    const res = await dispatch(
      renameGoalAsync({
        user_id,
        year_idx,
        goal_idx,
        renamed_goal: renamedValue,
        local_data: localData,
      })
    );
    if (res.payload.status === 200)
      dispatch(saveUserData(res.payload.data.userData));

    setEnableRename(false);
  };

  const toggleYearlyGoal = async () => {
    const res = await dispatch(
      toggleGoalAsync({
        user_id,
        year_idx,
        goal_idx,
        updated_toggle: !toggleDone,
      })
    );

    // A different approach in which we don't pass the local_data instead
    // if there's an error, we handle it in addCase and pass it in the UI
    if (res.payload.status !== 200) return alert("Could not complete task");
    if (res.payload.data.error) return alert(res.payload.data.error);

    dispatch(saveUserData(res.payload.data.userData));
    setToggleDone(!toggleDone);
  };

  return (
    <div className="flex items-center justify-between inline pl-2 mb-2 ">
      {enableRename ? (
        <div className="flex ml-10 items-center">
          <form onSubmit={renameYearlyGoal}>
            <input
              type="text"
              placeholder="Rename Goal"
              autoFocus
              value={renamedValue}
              onChange={(e) => setRenamedValue(e.target.value)}
            />
          </form>
        </div>
      ) : (
        <div className="flex items-center">
          <input
            id="orange-checkbox"
            type="checkbox"
            onChange={toggleYearlyGoal}
            checked={toggleDone}
            className="w-4 h-4 mx-3 text-orange-600 bg-gray-100 border-gray-200 rounded focus:ring-orange-600 
            dark:focus:ring-orange-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-600 
            dark:border-gray-100 cursor-pointer"
          />

          <div>{curr.goal}</div>
        </div>
      )}

      <div className="flex">
        <GoalsOptions
          user_id={user_id}
          year_idx={year_idx}
          curr={curr}
          enableRename={enableRename}
          setEnableRename={setEnableRename}
          localData={localData}
        />
      </div>
    </div>
  );
}

export default GoalItem;
