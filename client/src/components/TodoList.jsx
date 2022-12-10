import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addCategoryAsync, deleteCategoryAsync } from "../redux/categorySlice";
import { GrFormClose } from "react-icons/gr";

const TodoList = ({ userTodoList, user_id }) => {
  const dispatch = useDispatch();
  const [addCategoryValue, setAddCategoryValue] = useState("");

  const [todoList, setTodoList] = useState(userTodoList);
  // TODO: Including a todo loader gif
  const [loadedTodos, setLoadedTodos] = useState(todoList ? true : false);

  const addCategory = async (e) => {
    e.preventDefault();
    if (addCategoryValue) {
      try {
        // If adding is successful, server will return category obj, including the newly created category id
        const categoryObjFromDB = await dispatch(
          addCategoryAsync({ user_id, category: addCategoryValue })
        );
        console.log(categoryObjFromDB);
        // Push the new category to the current todo list
        setTodoList((prevState) => [
          ...todoList,
          categoryObjFromDB.payload.data,
        ]);
      } catch (err) {
        console.log(err.message);
      }
    }
    setAddCategoryValue("");
  };

  const deleteCategory = async (e, categoryId) => {
    e.preventDefault();
    console.log("YEahhh");
    try {
      const deletedCategory = await dispatch(
        deleteCategoryAsync({ user_id, categoryId })
      );

      console.log(deletedCategory);
    } catch (err) {
      console.log(err.message);
    }
  };

  // async function getUserTodoList(id) {
  //   try {
  //     const fetchedTodoList = await axios.get(`/user/${id}`);
  //     console.log("fetchedTodoList:", fetchedTodoList);
  //     // Set the current todoList with the new updated one from adding a category
  //     setTodoList(fetchedTodoList.data);
  //   } catch (error) {
  //     return error.message;
  //   }
  // }

  // Updating the UI each time there is an onSubmit, in order to fetch the array of categories

  // useEffect(() => {
  // Async func for doing a GET req and fetching categories
  // getUserTodoList(user_id);
  // if (userTodoList) setLoadedTodos(true);
  // console.log(todoList);
  // Having an additional setState do do another re-render in order to get the last element
  //   setOnSubmit("additional re-render");
  // }, [onSubmit, user_id]);

  return (
    <div className="flex ml-5">
      <div className="rounded-lg shadow-lg bg-white pr-5 max-w-sm">
        <ul className="list-group mb-2 pt-5 ">
          {loadedTodos &&
            todoList.map((curr, index) => (
              <div>
                <div className="brackets min-w-[93%]" key={index}>
                  <CategoryItem
                    user_id={user_id}
                    categoryId={curr._id}
                    category={curr.category}
                    tasks={curr.tasks}
                  />
                  <button
                    key={index + "button"}
                    className="ml-3 p-1 group-hover:block rounded-full"
                    onClick={(e) => deleteCategory(e, curr._id)}
                  >
                    <GrFormClose />
                  </button>
                </div>
              </div>
            ))}

          <form onSubmit={addCategory} className="flex items-center mb-5">
            <button className="bg-transparent ml-4 text-red-700 font-semibold hover:text-black py-2 px-2">
              <AiOutlinePlus />
            </button>
            <input
              type="text"
              autoFocus
              placeholder="Add Category..."
              value={addCategoryValue}
              onChange={(event) => setAddCategoryValue(event.target.value)}
              // onBlur={() => setCategoryInput(false)}
              className="text-black-500 ml-3 h-12 focus:outline-none pl-5 pr-5 rounded-lg border border-gray-300 focus:shadow focus:outline-none block"
            />
          </form>
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
