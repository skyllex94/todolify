import React from "react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { saveUserData } from "../../redux/dataSlice";
import { addGoalAsync } from "../../redux/goalsSlice";

export default function AddYearlyGoal({ year, localData }) {
  const [goal, setGoal] = useState("");
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.auth.user_id);

  async function addGoal(e) {
    e.preventDefault();
    // Checks before committing dispatch
    if (goal === "") return alert("Please write a yearly goal.");

    if (!user_id || !year || !goal || !localData)
      return alert("Essential data missing");

    const year_idx = localData.goals.findIndex((curr) => curr.year === year);
    if (year_idx < 0) return alert("Year was not found");

    try {
      const res = await dispatch(addGoalAsync({ user_id, year_idx, goal }));

      if (res.type === "addGoalAsync/fulfilled")
        // Do your checks after having a fully working request
        dispatch(saveUserData(res.payload.data.userData));

      setGoal("");
    } catch (error) {
      return { error: error.message };
    }
  }

  return (
    <form onSubmit={addGoal} className="mt-4">
      <div className="flex items-center pb-5">
        <div className="ml-6 mr-4">
          <AiOutlinePlus />
        </div>

        <input
          type="text"
          placeholder="Add Yearly Goal..."
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full text-black-500 h-12 
            pr-5 rounded-lg border hover:border-red-500 focus:shadow focus:border-red-500 block"
        />
      </div>
    </form>
  );
}
