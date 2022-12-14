import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ModalAddCategory from "./forms/ModalAddCategory";

function AddCategory({ user_id }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex items-center pb-2">
      <div className="ml-6 mr-4">
        <AiOutlinePlus />
      </div>

      <input
        type="text"
        autoFocus
        placeholder="Add Category..."
        onClick={() => setShowModal(true)}
        className=" w-full text-black-500 ml-3 mr-2 h-12 focus:outline-none pl-5 pr-5 rounded-lg border border-gray-300 focus:shadow focus:outline-none block"
      />

      {showModal && (
        <ModalAddCategory setShowModal={setShowModal} user_id={user_id} />
      )}
    </div>
  );
}

export default AddCategory;
