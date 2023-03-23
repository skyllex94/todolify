import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

function EnableEditCategory({ setEnableEdit }) {
  return (
    <button
      className="mr-1 rounded-full group-hover:block"
      onClick={() => setEnableEdit((prevState) => !prevState)}
    >
      <AiOutlineEdit />
    </button>
  );
}

export default EnableEditCategory;
