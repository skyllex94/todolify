import React, { useState } from "react";
import { MdRemoveCircle, MdSystemUpdateAlt } from "react-icons/md";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/dataSlice";
import {
  removeGoalAsync,
  renameGoalAsync,
  toggleGoalAsync,
} from "../../redux/goalsSlice";

function GoalItem({ user_id, curr, year_idx, goal_idx, localData }) {
  const [enableRename, setEnableRename] = useState(false);
  const [renamedValue, setRenamedValue] = useState(curr.goal);
  const [toggleDone, setToggleDone] = useState(curr.done);

  const dispatch = useDispatch();

  const removeYearlyGoal = async (goal_id) => {
    const res = await dispatch(
      removeGoalAsync({ user_id, goal_id, year_idx, local_data: localData })
    );

    if (res.payload.status === 200)
      dispatch(saveUserData(res.payload.data.userData));
  };

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
            id="red-checkbox"
            type="checkbox"
            className="accent-orange-600 mx-3"
            onChange={toggleYearlyGoal}
            checked={toggleDone}
          />
          <div className="px-3">{curr.goal}</div>
        </div>
      )}

      <div className="flex">
        <button onClick={() => setEnableRename(!enableRename)}>
          <MdSystemUpdateAlt />
        </button>
        <button onClick={() => removeYearlyGoal(curr._id)}>
          <MdRemoveCircle />
        </button>
      </div>
    </div>
  );
}

export default GoalItem;
