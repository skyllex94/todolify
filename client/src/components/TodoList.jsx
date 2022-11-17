import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CategoryItem from "./CategoryItem";

const TodoList = () => {
  const categories = useSelector((state) => state.category);

  return (
    <ul className="list-group ml-3 mb-2">
      {categories.map((curr, index) => (
        <CategoryItem
          key={index}
          categoryId={curr.id}
          category={curr.category}
          tasks={curr.tasks}
        />
      ))}
    </ul>
  );
};

export default TodoList;
