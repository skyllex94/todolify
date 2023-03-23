import React from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deleteCategoryAsync } from "../../redux/todosSlice";

function DeleteCategory({ user_id, id, day, month_year, dayWtData }) {
  const dispatch = useDispatch();

  const deleteCategory = async () => {
    // Future optimization - Find the monthIdx and dayIdx before you pass
    // the values so one of the DB queries can be omitted
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
      className="rounded-full p-1 group-hover:block"
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
