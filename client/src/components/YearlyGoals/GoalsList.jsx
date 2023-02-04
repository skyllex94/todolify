import React, { useState } from "react";
import { MdRemoveCircle, MdSystemUpdateAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { saveUserData } from "../../redux/dataSlice";
import { removeGoalAsync } from "../../redux/goalsSlice";
import AddYearlyGoal from "./AddYearlyGoal";

function GoalsList({ user_id }) {
  const localData = useSelector((state) => state.data);
  const [enableRename, setEnableRename] = useState(false);
  const [renamedValue, setRenamedValue] = useState("");
  const dispatch = useDispatch();

  const removeYearlyGoal = async (year_idx, goal_id) => {
    const res = await dispatch(
      removeGoalAsync({ user_id, goal_id, year_idx, local_data: localData })
    );

    if (res.payload.status === 200)
      dispatch(saveUserData(res.payload.data.userData));
  };

  const renameYearlyGoal = async (year_idx, goal_id) => {};
  // Start here: figure out why it's updating all fields

  return (
    localData &&
    localData.goals.map((yearlyGoals, idx) => (
      <div key={idx} className="pt-36 ml-10 w-full">
        <div className="todo-list ml-5 min-w-[25%] max-w-[25%]">
          <div className="rounded-lg shadow-lg bg-white pr-5 justify-between">
            <ul className="list-group pt-5">
              <h3 className="text-center">
                <span>Year {yearlyGoals.year}</span>
              </h3>

              {yearlyGoals.list.map((curr, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between inline mb-1"
                  >
                    {enableRename ? (
                      <div className="flex items-center">
                        <form onSubmit={renameYearlyGoal}>
                          <input
                            type="text"
                            placeholder="Rename Goal"
                            value={renamedValue}
                            onChange={(e) => setRenamedValue(e.target.value)}
                          />
                        </form>
                      </div>
                    ) : (
                      <div>{curr.goal}</div>
                    )}

                    <div className="flex">
                      <button onClick={() => setEnableRename(!enableRename)}>
                        <MdSystemUpdateAlt />
                      </button>
                      <button onClick={() => removeYearlyGoal(idx, curr._id)}>
                        <MdRemoveCircle />
                      </button>
                    </div>
                  </div>
                );
              })}

              <AddYearlyGoal localData={localData} year={yearlyGoals.year} />
            </ul>
          </div>
        </div>
      </div>
    ))
  );
}

// Later on for daily list :

// function GoalsList({ goalsList }) {
//     console.log("goalsList", goalsList);
//     return (
//       goalsList &&
//       goalsList.goals.map((yearlyGoals, idx) => (
//         <div key={idx} className="pt-36 ml-10 w-full">
//           <div className="todo-list ml-5 min-w-[25%] max-w-[25%]">
//             <div className="rounded-lg shadow-lg bg-white pr-5 justify-between">
//               <ul className="list-group pt-5">
//                 <h3 className="text-center">
//                   <span>Year {yearlyGoals.year}</span>
//                 </h3>

//                 {yearlyGoals.list.map((curr, index) => {
//                   return (
//                     <div key={index} className="flex inline mb-1">
//                       <div className="brackets min-w-[93%]">{curr.goal}</div>
//                     </div>
//                   );
//                 })}

//                 {/* <AddCategory
//               user_id={user_id}
//               day={day}
//               month_year={month_year}
//               dayWtData={dayWtData}
//             />

//             {events && <EventsInTodos events={events} />} */}
//               </ul>
//             </div>
//           </div>
//         </div>
//       ))
//     );
//   }

export default GoalsList;
