import React, { useEffect } from "react";
import { useState } from "react";
import SideMenu from "../components/SideMenu/SideMenu";
import Header from "./Header";
import loader from "../assets/loader.gif";
import GoalsList from "../components/YearlyGoals/GoalsList";
import { useDispatch, useSelector } from "react-redux";
import { getGoalsAsync } from "../redux/goalsSlice";

function Goals() {
  const [loadGoals, setLoadGoals] = useState(false);
  const user = useSelector((state) => state.auth);
  const [goalsList, setGoalsList] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchGoals() {
      if (user.userData !== null) return setGoalsList(user.userData.payload);
      let respFromDB = await dispatch(getGoalsAsync(user.user_id));
      console.log("respFromDBGoals:", respFromDB);
      if (!respFromDB.type === "getTodosAsync/fulfilled") {
        // Retry DB request
        respFromDB = dispatch(getGoalsAsync(user.user_id));
      }
      return setGoalsList(respFromDB.payload.data.userData);
    }

    fetchGoals();
    setLoadGoals(true);
  }, []);

  return (
    <React.Fragment>
      <Header />

      <div className="flex h-screen">
        <SideMenu />
        {loadGoals && goalsList ? (
          <GoalsList goalsList={goalsList} />
        ) : (
          <div>
            <img src={loader} alt="loader" />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Goals;
