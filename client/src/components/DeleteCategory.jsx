import React from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deleteCategoryAsync } from "../redux/todosSlice";

function DeleteCategory({ user_id, id, day, month_year, dayWtData }) {
  const dispatch = useDispatch();

  const deleteCategory = async () => {
    try {
      dispatch(
        deleteCategoryAsync({
          user_id,
          categoryId: id,
          day,
          month_year,
          dayWtData,
        })
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <button
      className="p-1 group-hover:block rounded-full"
      onClick={(e) => {
        const confirmBox = window.confirm(
          "Do you really want to delete this category?"
        );
        if (confirmBox) deleteCategory();
      }}
    >
      <GrFormClose />
    </button>
  );
}

export default DeleteCategory;
