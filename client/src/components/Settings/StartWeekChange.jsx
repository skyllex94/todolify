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
      id="orange-checkbox"
      type="checkbox"
      onChange={changeStartOfWeek}
      checked={fromSunday}
      className="w-4 cursor-pointer h-4 mx-3 text-orange-600 border-gray-600 
    rounded focus:ring-orange-600 
    dark:focus:ring-orange-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-600 
    dark:border-gray-100"
    />
  );
}
