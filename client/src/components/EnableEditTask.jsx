import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

function EnableEditTask({ setEnableEdit }) {
  return (
    <button
      className="hidden group-hover:block rounded-full mr-1"
      onClick={() => setEnableEdit((prevState) => !prevState)}
    >
      <AiOutlineEdit />
    </button>
  );
}

export default EnableEditTask;
