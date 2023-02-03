import React from "react";
import AddYearlyGoal from "./AddYearlyGoal";

function GoalsList({ goalsList }) {
  console.log("goalsList", goalsList);

  return (
    goalsList &&
    goalsList.goals.map((yearlyGoals, idx) => (
      <div key={idx} className="pt-36 ml-10 w-full">
        <div className="todo-list ml-5 min-w-[25%] max-w-[25%]">
          <div className="rounded-lg shadow-lg bg-white pr-5 justify-between">
            <ul className="list-group pt-5">
              <h3 className="text-center">
                <span>Year {yearlyGoals.year}</span>
              </h3>

              {yearlyGoals.list.map((curr, index) => {
                return (
                  <div key={index} className="flex inline mb-1">
                    <div className="brackets min-w-[93%]">{curr.goal}</div>
                  </div>
                );
              })}

              <AddYearlyGoal userData={goalsList} year={yearlyGoals.year} />
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
