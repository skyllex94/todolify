import React from "react";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/dataSlice";
import { removeGoalAsync } from "../../redux/goalsSlice";

import { Dropdown } from "flowbite-react";
import { MdDeleteOutline, MdDriveFileRenameOutline } from "react-icons/md";

function GoalsOptions({
  user_id,
  year_idx,
  curr,
  localData,
  enableRename,
  setEnableRename,
}) {
  const dispatch = useDispatch();

  const removeYearlyGoal = async (goal_id) => {
    const res = await dispatch(
      removeGoalAsync({ user_id, goal_id, year_idx, local_data: localData })
    );

    if (res.payload.status === 200)
      dispatch(saveUserData(res.payload.data.userData));
  };

  return (
    <div className="goals-options text-white">
      <Dropdown inline>
        <Dropdown.Item
          icon={MdDriveFileRenameOutline}
          onClick={() => setEnableRename(!enableRename)}
        >
          Rename
        </Dropdown.Item>

        <Dropdown.Divider />
        <Dropdown.Item
          icon={MdDeleteOutline}
          onClick={() => removeYearlyGoal(curr._id)}
        >
          Delete
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}

export default GoalsOptions;
