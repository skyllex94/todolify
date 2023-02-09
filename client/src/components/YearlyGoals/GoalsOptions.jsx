import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { SlOptionsVertical } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/dataSlice";
import { removeGoalAsync } from "../../redux/goalsSlice";
import { OverlayTrigger, Popover } from "react-bootstrap";

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

  const popover = (
    <div className="bg-white border-solid border-2 border-red-600 rounded mt-2 mr-1 p-2">
      <Popover id="popover-positioned-top">
        <Popover.Body>
          <button
            className="flex items-center w-full justify-between p-1 hover:bg-gray-100"
            onClick={() => setEnableRename(!enableRename)}
          >
            <p>Rename Goal</p>
            <AiOutlineEdit className="ml-3" />
          </button>
          <button
            className="flex items-center w-full justify-between p-1 hover:bg-gray-100"
            onClick={() => removeYearlyGoal(curr._id)}
          >
            <p>Delete Goal</p>
            <GrFormClose className="ml-3 right" />
          </button>
        </Popover.Body>
      </Popover>
    </div>
  );

  return (
    <div>
      <OverlayTrigger
        trigger="click"
        key="bottom"
        rootClose
        placement="bottom-end"
        overlay={popover}
      >
        <button>
          <SlOptionsVertical />
        </button>
      </OverlayTrigger>
    </div>
  );
}

export default GoalsOptions;
