import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useTodoList() {
  // Redux state for todo list of auth user
  const todoList = useSelector((state) => state.todos);

  // loader gif state
  const [loadedTodos, setLoadedTodos] = useState(false);

  // Change the loader to the data when inputted
  useEffect(() => {
    if (todoList) setLoadedTodos(true);
  }, []);

  return { loadedTodos, todoList };
}
