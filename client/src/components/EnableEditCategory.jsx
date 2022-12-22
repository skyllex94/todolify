import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

function EnableEditCategory({ setEnableEdit }) {
  return (
    <button
      className="group-hover:block rounded-full mr-1"
      onClick={() => setEnableEdit((prevState) => !prevState)}
    >
      <AiOutlineEdit />
    </button>
  );
}

export default EnableEditCategory;
