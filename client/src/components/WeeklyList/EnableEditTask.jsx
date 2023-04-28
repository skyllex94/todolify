import React from "react";

function EnableEditTask({ setEnableEdit }) {
  return (
    <button
      // className="rename_button absolute mr-1 hidden rounded-full group-hover:block"
      onClick={() => setEnableEdit((prevState) => !prevState)}
    >
      Rename
    </button>
  );
}

export default EnableEditTask;
