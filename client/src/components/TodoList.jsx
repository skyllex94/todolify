import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CategoryItem from "./CategoryItem";
// Axios

const TodoList = ({ userTodoList }) => {
  const jwt = useSelector((state) => state.auth.jwt);

  const fetctedTodoList = async function getTodoList() {
    return await userTodoList;
  };

  console.log(userTodoList);

  const categories = useSelector((state) => state.category);

  return (
    <div className="flex ml-5">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <div className="p-4">
          <ul className="list-group mb-2 pt-5">
            {userTodoList &&
              userTodoList.map((curr, index) => (
                <div className="brackets min-w-[90%] px-5" key={index}>
                  <CategoryItem
                    categoryId={curr._id}
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
