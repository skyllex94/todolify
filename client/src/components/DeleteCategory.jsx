import React from "react";
import { GrFormClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deleteCategoryAsync } from "../redux/categorySlice";

function DeleteCategory({ user_id, id, setTodoList }) {
  const dispatch = useDispatch();

  const deleteCategory = async () => {
    try {
      const deletedCategory = await dispatch(
        deleteCategoryAsync({ user_id, categoryId: id })
      );

      const deletedCategoryId = deletedCategory.payload.data;
      // Remove the category
      if (deletedCategoryId) {
        setTodoList((prevState) =>
          prevState.filter((curr) => curr._id !== deletedCategoryId)
        );
      }
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
