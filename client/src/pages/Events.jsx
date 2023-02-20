import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarMonth from "../components/Events/CalendarMonth";
import SideMenu from "../components/SideMenu/SideMenu";
import { getMonth } from "../utils/functions";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { getEventsAsync } from "../redux/eventsSlice";
import loader from "../assets/loader.gif";
import { saveUserData } from "../redux/dataSlice";

function Events() {
  // Declare required global and local states
  const user_id = useSelector((state) => state.auth.user_id);
  const fromSunday = useSelector((state) => state.settings.startFromSunday);
  const localData = useSelector((state) => state.data);

  const [currMonth, setCurrMonth] = useState(getMonth());
  const [currMonthIdx, setCurrMonthIdx] = useState(getCurrMonth());
  const [loadEvents, setLoadEvents] = useState(false);
  // const events = useSelector((state) => state.events);

  // UI Manipulation requirements
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function getCurrMonth() {
    const currDate = new Date();
    return currDate.getMonth();
  }

  useEffect(() => {
    setCurrMonth(getMonth(currMonthIdx, fromSunday));
  }, [currMonthIdx, fromSunday]);

  // Load all the events for current month
  useEffect(() => {
    // Await fetching all the response
    const getEvents = async (user_id) => {
      if (localData) {
        setLoadEvents(true);
        return;
      }

      // Update user data with result from the request
      const res = await dispatch(getEventsAsync(user_id));
      if (res.payload.status === 200)
        dispatch(saveUserData(res.payload.data.userTodoList));

      setLoadEvents(true);
    };

    if (!user_id) return console.log("User ID not found");

    getEvents(user_id).catch(console.error);
  }, [dispatch, user_id, localData]);

  useEffect(() => {
    // If there's no user_id, navigate back to landing page
    if (!user_id) navigate("/");
  }, [navigate, user_id]);

  return (
    <React.Fragment>
      <Header />

      <div className="flex h-screen">
        <SideMenu />

        {loadEvents ? (
          <CalendarMonth
            monthObj={currMonth}
            setCurrMonth={setCurrMonth}
            setCurrMonthIdx={setCurrMonthIdx}
          />
        ) : (
          <div>
            <img src={loader} className="loader pt-24" alt="loader" />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Events;
