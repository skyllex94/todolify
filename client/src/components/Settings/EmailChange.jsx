import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserEmailAsync } from "../../redux/settingsSlice";

export default function EmailChange({ user_id, setEnableEmailChange }) {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const updateEmail = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to change your email?")) return;

    if (!email || email === "")
      return alert("Please input the new user email.");
    if (!user_id) return alert("Missing user id, when updating email");
    const new_email = email;

    try {
      dispatch(updateUserEmailAsync({ user_id, new_email }));
    } catch (err) {
      alert(err.message);
    }

    setEnableEmailChange(false);
  };

  return (
    <form onSubmit={updateEmail} className="form-inline">
      <input
        type="email"
        autoFocus
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="block py-1 px-0 w-full text-md text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
            dark:focus:border-orange-500 focus:outline-none focus:ring-0 
            focus:border-orange-600 peer"
      />
    </form>
  );
}
