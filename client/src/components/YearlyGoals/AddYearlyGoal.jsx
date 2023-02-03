import React from "react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addGoalAsync } from "../../redux/goalsSlice";

export default function AddYearlyGoal({ year, userData }) {
  const [goal, setGoal] = useState("");
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.auth.user_id);

  function addGoal(e) {
    e.preventDefault();

    let user_goals = null;
    // Checks before committing dispatch
    if (goal === "") return alert("Please write an yearly goal.");
    if (userData) user_goals = userData.goals;
    if (!user_id || !year || !goal || !user_goals)
      return alert("Essential data missing");

    try {
      dispatch(addGoalAsync({ user_id, year, goal, user_goals }));
    } catch (error) {
      return { error: error.message };
    }
  }

  return (
    <form onSubmit={addGoal}>
      <div className="flex items-center pb-5">
        <div className="ml-6 mr-4">
          <AiOutlinePlus />
        </div>

        <input
          type="text"
          placeholder="Add Yearly Goal..."
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full text-black-500 ml-3 h-12 
            pl-5 pr-5 rounded-lg border hover:border-red-500 focus:shadow focus:border-red-500 block"
        />
      </div>
    </form>
  );
}
