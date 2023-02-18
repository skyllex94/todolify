import React, { useEffect } from "react";
import { useState } from "react";
import SideMenu from "../components/SideMenu/SideMenu";
import Header from "./Header";
import loader from "../assets/loader.gif";
import GoalsList from "../components/YearlyGoals/GoalsList";
import { useDispatch, useSelector } from "react-redux";
import { getGoalsAsync } from "../redux/goalsSlice";
import { saveUserData } from "../redux/dataSlice";
import UpdateNewYear from "../components/YearlyGoals/UpdateNewYear";
import { useHorizontalScroll } from "../hooks/horizontalScroll";

function Goals() {
  const [loadGoals, setLoadGoals] = useState(false);
  const localData = useSelector((state) => state.data);
  const user_id = useSelector((state) => state.auth.user_id);

  const dispatch = useDispatch();
  const scrollRef = useHorizontalScroll();

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
  }, [dispatch, localData, user_id]);

  return (
    <React.Fragment>
      <Header />

      <div className="flex h-screen">
        <SideMenu />
        <div
          ref={scrollRef}
          style={{ overflow: "auto" }}
          className="flex w-full"
        >
          {loadGoals ? (
            <React.Fragment>
              <GoalsList user_id={user_id} />
              <div className="pt-28">
                <UpdateNewYear user_id={user_id} />
              </div>
            </React.Fragment>
          ) : (
            <div>
              <img src={loader} className="pt-24 loader" alt="loader" />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Goals;
