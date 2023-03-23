import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

function EnableEditTask({ setEnableEdit }) {
  return (
    <button
      className="rename_button absolute mr-1 hidden rounded-full group-hover:block"
      onClick={() => setEnableEdit((prevState) => !prevState)}
    >
      <AiOutlineEdit />
    </button>
  );
}

export default EnableEditTask;
