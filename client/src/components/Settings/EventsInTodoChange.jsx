import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showEventsInTodoList } from "../../redux/settingsSlice";

export default function EventsInTodoChange() {
  const dispatch = useDispatch();
  const eventsInTodoList = useSelector(
    (state) => state.settings.showEventsInTodoList
  );

  const toggleEventsInTodos = () => {
    try {
      dispatch(showEventsInTodoList(!eventsInTodoList));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <input
      id="orange-checkbox"
      type="checkbox"
      onChange={toggleEventsInTodos}
      checked={eventsInTodoList}
      className="w-4 cursor-pointer h-4 mx-3 text-orange-600 border-gray-600 
    rounded focus:ring-orange-600 
    dark:focus:ring-orange-600 dark:ring-offset-gray-200 focus:ring-2 dark:bg-gray-600 
    dark:border-gray-100"
    />
  );
}
