import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ModalAddCategory from "./ModalAddCategory";

function AddCategory({ user_id, day, month_year, dayWtData }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex items-center pb-5">
      <div className="ml-6 mr-4">
        <AiOutlinePlus />
      </div>

      <input
        type="text"
        placeholder="Add Category..."
        onClick={() => setShowModal(true)}
        className="text-black-500 ml-3 mr-2 block h-12 w-full rounded-lg border border-gray-300 pl-5 pr-5 focus:shadow focus:outline-none"
      />

      {showModal && (
        <ModalAddCategory
          setShowModal={setShowModal}
          user_id={user_id}
          day={day}
          month_year={month_year}
          dayWtData={dayWtData}
        />
      )}
    </div>
  );
}

export default AddCategory;
