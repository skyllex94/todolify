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
        placeholder="Add Bucket..."
        onClick={() => setShowModal(true)}
        className=" w-full text-black-500 ml-3 mr-2 h-12 focus:outline-none pl-5 pr-5 rounded-lg border border-gray-300 focus:shadow focus:outline-none block"
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
