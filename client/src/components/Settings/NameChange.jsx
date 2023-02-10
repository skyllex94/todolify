import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserNameAsync } from "../../redux/settingsSlice";

export default function NameChange({ user_id, setEnableNameChange }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const updateName = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to change your username?"))
      return;

    if (!name || name === "") return alert("Please input the new user name.");
    if (!user_id) return alert("Missing user id, when updating name");
    const new_name = name;

    try {
      dispatch(updateUserNameAsync({ user_id, new_name }));
    } catch (err) {
      alert(err.message);
    }

    setEnableNameChange(false);
  };

  return (
    <form onSubmit={updateName} className="form-inline">
      <input
        type="text"
        autoFocus
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="block py-1 px-0 w-full text-md text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
            dark:focus:border-orange-500 focus:outline-none focus:ring-0 
            focus:border-orange-600 peer"
      />
    </form>
  );
}
