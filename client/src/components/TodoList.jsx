import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CategoryItem from "./CategoryItem";
// Axios
import axios from "axios";

const TodoList = () => {
  const catss = [];
  const loadAsyncData = async () => {
    try {
      const res = await axios.get("/user/637f9337db5851a564a0afff");
      console.log(res.data.categories);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    loadAsyncData();
  }, []);

  const categories = useSelector((state) => state.category);

  return (
    <div className="flex ml-5">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <div className="p-4">
          <ul className="list-group mb-2 pt-5">
            {categories.map((curr, index) => (
              <div className="brackets min-w-[90%] pr-5" key={index}>
                <CategoryItem
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
