import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startFromSunday } from "../../redux/settingsSlice";

export default function StartWeekChange() {
  const fromSunday = useSelector((state) => state.settings.startFromSunday);
  const dispatch = useDispatch();

  function changeStartOfWeek() {
    dispatch(startFromSunday(!fromSunday));
  }

  return (
    <input
      aria-label="change-week-start"
      id="orange-checkbox"
      type="checkbox"
      onChange={changeStartOfWeek}
      checked={fromSunday}
      className="mx-3 h-4 w-4 cursor-pointer rounded border-gray-600 
    text-orange-600 focus:ring-2 
    focus:ring-orange-600 dark:border-gray-100 dark:bg-gray-600 dark:ring-offset-gray-200 
    dark:focus:ring-orange-600"
    />
  );
}
