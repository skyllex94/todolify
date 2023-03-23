import React from "react";
import DeleteTask from "./DeleteTask";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { SlOptionsVertical } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { deleteTaskAsync } from "../../redux/todosSlice";

function CategoryOptions({
  user_id,
  category_id,
  id,
  day,
  month_year,
  setEnableEdit,
}) {
  const dispatch = useDispatch();

  const handleDeleteTask = async () => {
    try {
      dispatch(
        deleteTaskAsync({
          user_id,
          category_id,
          day,
          month_year,
          id,
        })
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const popover = (
    <div className="rounded border-2 border-solid border-red-600 bg-white p-2">
      <Popover id="popover-positioned-top">
        <Popover.Body>
          <button
            className="flex w-full items-center justify-between p-1 hover:bg-gray-100"
            onClick={() => setEnableEdit((prev) => !prev)}
          >
            <p>Rename Task</p>
            <AiOutlineEdit className="ml-3" />
          </button>

          <button
            className="flex w-full items-center justify-between p-1 hover:bg-gray-100"
            onClick={() => handleDeleteTask()}
          >
            <p>Delete Task</p>
            <GrFormClose />
          </button>

          <DeleteTask
            user_id={user_id}
            category_id={category_id}
            id={id}
            day={day}
            month_year={month_year}
          />
        </Popover.Body>
      </Popover>
    </div>
  );

  return (
    <div className="absolute">
      <OverlayTrigger
        trigger="click"
        key="bottom"
        rootClose
        placement="bottom-start"
        overlay={popover}
      >
        <button>
          <SlOptionsVertical />
        </button>
      </OverlayTrigger>
    </div>
  );
}

export default CategoryOptions;
