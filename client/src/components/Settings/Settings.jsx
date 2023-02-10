import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../pages/Header";
import { getUserConfigAsync } from "../../redux/settingsSlice";
import SideMenu from "../SideMenu/SideMenu";
import EmailChange from "./EmailChange";
import NameChange from "./NameChange";
import PassChange from "./PassChange";

export default function Settings() {
  const user_id = useSelector((state) => state.auth.user_id);
  const userConfig = useSelector((state) => state.settings.userConfig);
  const [loadedConfig, setLoadedConfig] = useState(false);
  const [enableNameChange, setEnableNameChange] = useState(false);
  const [enableEmailChange, setEnableEmailChange] = useState(false);
  const [enablePassChange, setEnablePassChange] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserConf = async () => {
      try {
        const res = await dispatch(getUserConfigAsync(user_id));
        console.log("res:", res);
        if (res.payload.status === 200) setLoadedConfig(true);
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserConf();
  }, []);

  return (
    <React.Fragment>
      <Header />

      <div className="flex h-screen">
        <SideMenu />

        <div className="pl-5 pt-28 w-50">
          <div className="profile-settings">
            <p className="mb-4 ml-1">
              <b>Profile:</b>
            </p>
            <div className="border rounded-md">
              <div className="flex items-center justify-between px-10 pt-10 pb-5 h-10 text-black">
                <div>
                  <label htmlFor="user_name" className="pr-3">
                    Name:
                  </label>
                  {enableNameChange ? (
                    <NameChange
                      user_id={user_id}
                      setEnableNameChange={setEnableNameChange}
                    />
                  ) : (
                    <label htmlFor="user">
                      {loadedConfig ? userConfig.name : "Loading..."}
                    </label>
                  )}
                </div>
                <button
                  onClick={() => setEnableNameChange((prev) => !prev)}
                  className="bg-red-500 ml-60 text-white active:bg-red-600 font-bold 
                  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none 
                  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between px-10 pt-10 pb-5 h-10 text-black">
                <div>
                  <label htmlFor="email" className="pr-3">
                    Email:
                  </label>

                  {enableEmailChange ? (
                    <EmailChange
                      user_id={user_id}
                      setEnableEmailChange={setEnableEmailChange}
                    />
                  ) : (
                    <label>
                      {loadedConfig ? userConfig.email : "Loading..."}
                    </label>
                  )}
                </div>
                <button
                  onClick={() => setEnableEmailChange((prev) => !prev)}
                  className="bg-red-500 ml-60 text-white active:bg-red-600 font-bold 
                  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none 
                  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between px-10 py-5 text-black">
                {enablePassChange ? (
                  <PassChange
                    user_id={user_id}
                    setEnablePassChange={setEnablePassChange}
                  />
                ) : (
                  <div>
                    <label htmlFor="password" className="pr-3">
                      Password:
                    </label>
                    <label>********</label>
                  </div>
                )}

                <button
                  onClick={() => setEnablePassChange(!enablePassChange)}
                  className="bg-red-500 ml-60 text-white active:bg-red-600 font-bold 
                  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none 
                  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          <div className="customization-settings">
            <p className="mt-10 mb-4 ml-1">
              <b>Customization:</b>
            </p>
            <div className="border rounded-md">
              <div className="flex items-center justify-between px-10 pt-10 h-10">
                <label>Include Events is Weekly List:</label>

                <input
                  id="orange-checkbox"
                  type="checkbox"
                  // onChange={toggleCompletedTask}
                  // checked={toggleChecked}
                  className="w-4 cursor-pointer h-4 mx-3 text-orange-600 border-gray-600 
                    rounded focus:ring-orange-600 
                    dark:focus:ring-orange-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-600 
                    dark:border-gray-100"
                />
              </div>

              <div className="flex items-center justify-between p-10 h-10">
                <label>Start Week from Monday:</label>

                <input
                  id="orange-checkbox"
                  type="checkbox"
                  // onChange={toggleCompletedTask}
                  // checked={toggleChecked}
                  className="w-4 cursor-pointer h-4 mx-3 text-orange-600 border-gray-600 
                    rounded focus:ring-orange-600 
                    dark:focus:ring-orange-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-600 
                    dark:border-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="deletion-settings">
            <p className="mt-10 mb-4 ml-1">
              <b>Deletion:</b>
            </p>
            <div className="border rounded-md">
              <div className="flex items-center justify-between p-10 pt-10 h-10">
                <button
                  className="bg-white text-black active:bg-white-600 font-bold 
                  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg border
                  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Sign-out
                </button>

                <button
                  className="bg-red-500 ml-60 text-white active:bg-red-600 font-bold 
                uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none 
                focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Permanently Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
