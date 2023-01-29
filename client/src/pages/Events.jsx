import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CalendarUI from "../components/EventsComponents/CalendarUI";
import SideMenu from "../components/SideMenu";
import { decodeJWT, getMonth } from "../utils/functions";
import Header from "./Header";
import { useState } from "react";
function Events() {
  const savedJWT = window.localStorage.getItem("jwt");
  const user_id = decodeJWT(savedJWT);
  const { id } = user_id.user;

  const navigate = useNavigate();
  const [currMonth, setCurrMonth] = useState(getMonth());
  const { monthIdx } = 0;

  useEffect(() => {
    setCurrMonth(getMonth(monthIdx));
  }, []);

  useEffect(() => {
    // If there's no JWT, navigate back to landing page
    if (!id) navigate("/");
  }, [navigate, id]);

  return (
    <div>
      <Header />

      <div className="flex p-24">
        <SideMenu />
        <CalendarUI monthObj={currMonth} setCurrMonth={setCurrMonth} />
      </div>
    </div>
  );
}

export default Events;
