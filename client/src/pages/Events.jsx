import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarMonth from "../components/EventsComponents/CalendarMonth";
import SideMenu from "../components/SideMenu/SideMenu";
import { getMonth } from "../utils/functions";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { getEventsAsync } from "../redux/eventsSlice";
import loader from "../assets/loader.gif";

function Events() {
  // Declare required global and local states
  const user_id = useSelector((state) => state.auth.user_id);
  const [currMonth, setCurrMonth] = useState(getMonth());
  const [currMonthIdx, setCurrMonthIdx] = useState(0);
  const [loadEvents, setLoadEvents] = useState(false);
  const events = useSelector((state) => state.events);

  // UI Manipulation requirements
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrMonth(getMonth(currMonthIdx));
  }, [currMonthIdx]);

  // Load all the events for the current month
  useEffect(() => {
    // You need to await the async response to display the data after fetched
    const getEvents = async (user_id) => {
      const fetchedEvents = await dispatch(getEventsAsync(user_id));
      console.log("fetchedEvents:", fetchedEvents);

      if (fetchedEvents.type === "getEventsAsync/fulfilled")
        setLoadEvents(true);
    };

    if (!user_id) return console.log("User ID not found");
    getEvents(user_id).catch(console.error);
  }, [dispatch, user_id]);

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
            events={events}
          />
        ) : (
          <div>
            <img src={loader} className="pt-24 loader" alt="loader" />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Events;
