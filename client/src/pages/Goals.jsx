import React, { useEffect } from "react";
import { useState } from "react";
import SideMenu from "../components/SideMenu/SideMenu";
import Header from "./Header";
import loader from "../assets/loader.gif";
import GoalsList from "../components/YearlyGoals/GoalsList";
import { useDispatch, useSelector } from "react-redux";
import { getGoalsAsync } from "../redux/goalsSlice";
import { saveUserData } from "../redux/dataSlice";

function Goals() {
  const [loadGoals, setLoadGoals] = useState(false);
  const localData = useSelector((state) => state.data);
  const user_id = useSelector((state) => state.auth.user_id);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchGoals() {
      // If there's data already loaded from another DB fetch, populate it
      if (localData !== null) return;

      // Else make a post request to the DB
      let respFromDB = await dispatch(getGoalsAsync(user_id));
      if (!respFromDB.type === "getTodosAsync/fulfilled") {
        // Retry DB request
        respFromDB = await dispatch(getGoalsAsync(user_id));
      }

      // Update user data with result from the request
      dispatch(saveUserData(respFromDB.payload.data.userData));
    }

    fetchGoals();
    setLoadGoals(true);
  }, []);

  return (
    <React.Fragment>
      <Header />

      <div className="flex h-screen">
        <SideMenu />
        {loadGoals ? (
          <GoalsList user_id={user_id} />
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
