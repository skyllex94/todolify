import React from "react";
import { useSelector } from "react-redux";
import AddYearlyGoal from "./AddYearlyGoal";
import CompletedGoals from "./CompletedGoals";
import GoalItem from "./GoalItem";

function GoalsList({ user_id }) {
  const localData = useSelector((state) => state.data);

  return (
    localData &&
    localData.goals.map((yearlyGoals, idx) => (
      <div key={idx} className="flex pt-24 ml-5">
        <div className="todo-list ml-5 w-80">
          <div className="rounded-lg shadow-lg bg-white pr-5">
            <ul className="list-group pt-5">
              <h3 className="text-center mb-5">
                <span>
                  <b>Year {yearlyGoals.year}</b>
                </span>
              </h3>

              {yearlyGoals.list.map((curr, index) => {
                return (
                  <GoalItem
                    key={index}
                    user_id={user_id}
                    curr={curr}
                    year_idx={idx}
                    goal_idx={index}
                    localData={localData}
                  />
                );
              })}

              <AddYearlyGoal localData={localData} year={yearlyGoals.year} />

              <CompletedGoals
                year_idx={idx}
                goals={yearlyGoals.list}
                local_data={localData}
              />
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
