import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CategoryItem from "./CategoryItem";

const TodoList = () => {
  const categories = useSelector((state) => state.category);

  return (
    <div class="flex ml-5">
      <div class="rounded-lg shadow-lg bg-white max-w-sm">
        <div class="p-4">
          <ul className="list-group ml-3 mb-2 pt-5">
            {categories.map((curr, index) => (
              <div className="brackets px-5">
                <CategoryItem
                  key={index}
                  categoryId={curr.id}
                  category={curr.category}
                  tasks={curr.tasks}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
