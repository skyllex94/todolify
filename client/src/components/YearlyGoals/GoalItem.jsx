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
    <div className="goals mb-2 flex items-center justify-between pl-2">
      {enableRename ? (
        <div className="ml-10 flex items-center">
          <form onSubmit={renameYearlyGoal}>
            <input
              type="text"
              placeholder="Rename Goal"
              autoFocus
              onBlur={() => setEnableRename(false)}
              value={renamedValue}
              onChange={(e) => setRenamedValue(e.target.value)}
              className="text-md peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-1 px-0 text-gray-900 focus:border-orange-600 
              focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-orange-500"
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
            className="mx-3 h-4 w-4 cursor-pointer rounded border-gray-200 bg-gray-100 text-orange-600 
            focus:ring-2 focus:ring-orange-600 dark:border-gray-100 dark:bg-gray-600 
            dark:ring-offset-gray-200 dark:focus:ring-orange-600"
          />

          <div>{curr.goal}</div>
        </div>
      )}

      <GoalsOptions
        user_id={user_id}
        year_idx={year_idx}
        curr={curr}
        enableRename={enableRename}
        setEnableRename={setEnableRename}
        localData={localData}
      />
    </div>
  );
}

export default GoalItem;
