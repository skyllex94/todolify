import React, { useEffect, useState } from "react";
import DoneTasks from "./DoneTasks";
import TaskItem from "./TaskItem";
import DeleteCategory from "./DeleteCategory";
import RenameCategory from "./RenameCategory";
import AddTask from "./AddTask";
import EnableEditCategory from "./EnableEditCategory";
import SelectIcon from "./SelectIcon";
import { motion } from "framer-motion";

function CategoryItem({
  user_id,
  day,
  month_year,
  dayWtData,
  category_id,
  category_index,
  category,
  tasks,
  icon,
}) {
  const [enableEdit, setEnableEdit] = useState(false);
  const [currIcon, setCurrIcon] = useState(icon ?? null);
  const [categoryCompleted, setCategoryCompleted] = useState(false);

  // Rerender the new icon when the week is changed
  useEffect(() => {
    setCurrIcon(icon);
  }, [icon]);

  return (
    <ul className={`list-group`}>
      <div className="flex categories items-center justify-between">
        <div className="flex items-center text-left">
          <SelectIcon
            user_id={user_id}
            category_id={category_id}
            categoryCompleted={categoryCompleted}
            category_index={category_index}
            day={day}
            month_year={month_year}
            dayWtData={dayWtData}
            currIcon={currIcon}
            setCurrIcon={setCurrIcon}
          />
          {enableEdit ? (
            <RenameCategory
              user_id={user_id}
              category_index={category_index}
              day={day}
              month_year={month_year}
              dayWtData={dayWtData}
              setEnableEdit={setEnableEdit}
              category={category}
            />
          ) : (
            category
          )}
        </div>

        <div className="wrapper-right-elements flex inline">
          <DoneTasks
            tasks={tasks}
            setCategoryCompleted={setCategoryCompleted}
          />
          <EnableEditCategory setEnableEdit={setEnableEdit} />

          <DeleteCategory
            user_id={user_id}
            id={category_id}
            day={day}
            month_year={month_year}
            dayWtData={dayWtData}
          />
        </div>
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="items-center my-1"
      >
        {tasks &&
          tasks.map((curr, index) => {
            const { _id, task, done } = curr;

            return (
              <div
                className="flex items-center mb-1 justify-between group"
                key={index}
              >
                <TaskItem
                  user_id={user_id}
                  category_id={category_id}
                  category_index={category_index}
                  day={day}
                  month_year={month_year}
                  id={_id}
                  task={task}
                  task_index={index}
                  done={done}
                />
              </div>
            );
          })}
        <AddTask
          user_id={user_id}
          category_id={category_id}
          category_name={category}
          category_index={category_index}
          day={day}
          month_year={month_year}
          dayWtData={dayWtData}
        />
      </motion.div>
    </ul>
  );
}

export default CategoryItem;
