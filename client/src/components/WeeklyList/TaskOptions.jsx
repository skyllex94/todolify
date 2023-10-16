import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";

import { OverlayTrigger, Popover } from "react-bootstrap";
import DeleteTask from "./DeleteTask";

export function TaskOptions({ user_id, category_id, id, day, month_year }) {
  const popover = (
    <div className="mt-2 mr-1 rounded border-2 border-solid border-red-600 bg-white p-2">
      <Popover id="popover-positioned-top">
        <Popover.Body>
          <button
            className="flex w-full items-center justify-between p-1 hover:bg-gray-100"
            // onClick={() => setEnableRename(!enableRename)}
          >
            <p>Rename Goal</p>
            <AiOutlineEdit className="ml-3" />
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
