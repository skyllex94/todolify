import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);

  return (
    <ul className="list-group">
      {todos.map((todo, index) => {
        const { id, task, category, completed } = todo;
        return (
          <TodoItem
            id={id}
            key={index}
            task={task}
            category={category}
            completed={completed}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
