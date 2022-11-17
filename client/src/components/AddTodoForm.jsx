import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/todoSlice";

const AddTodoForm = () => {
  const defaultCategory = () => {
    const value = "Mundane";
    return value;
  };

  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const [category, setCategory] = useState(defaultCategory);

  const onSubmit = (event) => {
    event.preventDefault();
    if (value) {
      dispatch(
        addTask({
          task: value,
          category,
        })
      );
    }
  };

  return (
    <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Add todo..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="text-black-500 ml-3 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block"
        />

        <div className="relative lg:max-w-sm ml-3">
          <select
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
            name="Category"
            placeholder="Choose a Category..."
            required
          >
            <option disabled defaultValue={"Mundane"} hidden>
              Choose a Category...
            </option>
            <option value="Coding">Coding</option>
            <option value="Business">Business</option>
            <option>React With Headless UI</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 ml-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
