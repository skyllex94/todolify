import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleEventAsync } from "../redux/eventsSlice";

export default function ToggleEventInTodos({
  curr,
  day,
  month_year,
  event_idx,
}) {
  const [toggle, setToggle] = useState(curr.done);
  const user_id = useSelector((state) => state.auth.user_id);
  const local_data = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const toggleEvent = () => {
    const month_idx = local_data.date.findIndex(
      (curr) => curr.month_year === month_year
    );

    if (month_idx === null || month_idx < 0)
      return alert("There was an issue locating event month");

    const day_idx = local_data.date[month_idx].days.findIndex(
      (curr) => curr.day === day
    );

    if (day_idx === null || day_idx < 0)
      return alert("There was an issue locating event day");

    dispatch(
      toggleEventAsync({
        user_id,
        event_id: curr._id,
        event_idx,
        day_idx,
        month_idx,
        updated_toggle: !toggle,
      })
    );

    setToggle(!toggle);
  };

  return (
    <input
      id="purple-checkbox"
      type="checkbox"
      className="w-4 h-4 mx-3 text-purple-600 bg-gray-100 border-gray-200 rounded focus:ring-purple-600 
                      dark:focus:ring-purple-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-600 
                      dark:border-gray-100 cursor-pointer"
      onChange={toggleEvent}
      checked={toggle}
    />
  );
}
