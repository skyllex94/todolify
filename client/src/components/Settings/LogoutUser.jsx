import React from "react";
import useLogout from "../../hooks/useLogout";

export default function LogoutUser() {
  const { logoutUser } = useLogout();

  return (
    <button
      onClick={logoutUser}
      className="bg-white text-black active:bg-white-600 font-bold 
        uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg border
        focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    >
      Sign-out
    </button>
  );
}
