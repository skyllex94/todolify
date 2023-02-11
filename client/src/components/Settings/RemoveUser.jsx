import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";
import { permanentlyDeleteUserAsync } from "../../redux/settingsSlice";

export default function RemoveUser() {
  const user_id = useSelector((state) => state.auth.user_id);
  const dispatch = useDispatch();
  const { logoutUser } = useLogout();

  const permanentlyDeleteUser = async () => {
    try {
      // Confirmation message before deleting
      if (
        !window.confirm(
          "This action will permanently delete your account, among with all of its data! Are you sure you want to delete your account?"
        )
      )
        return;

      if (!user_id)
        alert("An error occured in the database when deleting the user.");

      const res = await dispatch(permanentlyDeleteUserAsync(user_id));
      console.log("res:", res);
      if (res.payload.status === 200) logoutUser();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <button
      onClick={permanentlyDeleteUser}
      className="bg-red-500 ml-60 text-white active:bg-red-600 font-bold 
        uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none 
        focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    >
      Permanently Delete User
    </button>
  );
}
