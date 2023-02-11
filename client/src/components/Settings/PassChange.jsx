import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useDisplayAlert } from "../../hooks/useDisplayAlert";
import { updateUserPassAsync } from "../../redux/settingsSlice";
import Alert from "../Alert";

export default function PassChange({ user_id, setEnablePassChange }) {
  const [pass, setPass] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const dispatch = useDispatch();
  // TODO: Might wanna work on alert and check how to best display them.
  const { alert, enableAlert, displayAlert } = useDisplayAlert();

  const updatePassword = async (e) => {
    console.log("sdf");
    e.preventDefault();
    if (!window.confirm("Are you sure you want to change your user password?"))
      return;
    console.log(pass, passRepeat);
    if (pass !== passRepeat) return alert("Passwords do not match");

    if (!pass || pass.length < 6)
      return alert("Please input the new user password, min 6 letters.");
    if (!user_id) return alert("Missing user id, when updating password");
    const new_pass = pass;

    try {
      const res = await dispatch(updateUserPassAsync({ user_id, new_pass }));

      displayAlert(
        "success",
        "Successfully updated password",
        res.payload.status,
        "Could not finish the request, please try again later."
      );
    } catch (err) {
      alert(err.message);
    }

    setEnablePassChange(false);
  };

  return (
    <div>
      {enableAlert && <Alert type={alert.type} message={alert.message} />}
      <form onSubmit={updatePassword}>
        <label className="mr-3" htmlFor="user_password_change">
          New Password:
        </label>
        <input
          type="password"
          autoFocus
          value={pass}
          onChange={(event) => setPass(event.target.value)}
          className="block py-1 px-0 w-full text-md text-gray-900 bg-transparent border-0 
                    border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                    dark:focus:border-orange-500 focus:outline-none focus:ring-0 
                    focus:border-orange-600 peer mb-4"
        />
      </form>
      <form onSubmit={updatePassword}>
        <label htmlFor="user_password_change">Repeat Password:</label>
        <input
          type="password"
          value={passRepeat}
          onChange={(event) => setPassRepeat(event.target.value)}
          className="block py-1 px-0 w-full text-md text-gray-900 bg-transparent border-0 
                    border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                    dark:focus:border-orange-500 focus:outline-none focus:ring-0 
                    focus:border-orange-600 peer"
        />
      </form>
    </div>
  );
}
