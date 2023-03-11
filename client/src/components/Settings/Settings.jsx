import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../pages/Header";
import { getUserConfigAsync } from "../../redux/settingsSlice";
import SideMenu from "../SideMenu/SideMenu";
import EmailChange from "./EmailChange";
import EventsInTodoChange from "./EventsInTodoChange";
import LogoutUser from "./LogoutUser";
import NameChange from "./NameChange";
import PassChange from "./PassChange";
import RemoveUser from "./RemoveUser";
import StartWeekChange from "./StartWeekChange";

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
        if (res.payload.status === 200) setLoadedConfig(true);
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserConf();
  }, [dispatch, user_id]);

  return (
    <React.Fragment>
      <Header />
      <div className="flex h-screen">
        <SideMenu />

        <div className="mt-28 w-96 pl-5 md:w-1/2 lg:w-1/2 xl:w-1/2">
          <div className="profile-settings">
            <p className="mb-4 ml-1">
              {/*ml-10 sm:ml-1 md:ml-1 lg:ml-1 xl:ml-1*/}
              <b>Profile:</b>
            </p>
            <div className="rounded-md border">
              <div className="flex h-10 items-center justify-between px-5 pt-10 pb-5 text-black">
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
                      {loadedConfig ? userConfig.name : "..."}
                    </label>
                  )}
                </div>
                <button
                  onClick={() => setEnableNameChange((prev) => !prev)}
                  className="ml-4 mr-1 mb-1 rounded bg-red-500 
                  px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none 
                  transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                >
                  Change
                </button>
              </div>

              <div className="flex h-10 items-center justify-between px-5 pt-10 pb-5 text-black">
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
                    <label>{loadedConfig ? userConfig.email : "..."}</label>
                  )}
                </div>
                <button
                  onClick={() => setEnableEmailChange((prev) => !prev)}
                  className="mr-1 mb-1 rounded bg-red-500 
                  px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none 
                  transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                >
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between px-5 py-5 text-black">
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
                  className="mr-1 mb-1 rounded bg-red-500 
                  px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none 
                  transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
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
            <div className="rounded-md border">
              <div
                className="flex h-10 items-center justify-start
              px-10 pt-10 sm:justify-between md:justify-between lg:justify-between"
              >
                <label>Include Events is Weekly List:</label>
                <EventsInTodoChange />
              </div>

              <div
                className="flex h-10 items-center justify-start
              p-10 sm:justify-between md:justify-between lg:justify-between"
              >
                <label>Start Week from Sunday:</label>

                <StartWeekChange />
              </div>
            </div>
          </div>

          <div className="deletion-settings">
            <p className="mt-10 mb-4 ml-1">
              <b>Deletion:</b>
            </p>
            <div className="rounded-md border">
              <div
                className="flex h-10 items-center justify-start
              p-10 pt-10 sm:justify-between md:justify-between lg:justify-between"
              >
                <LogoutUser />
                <RemoveUser />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
