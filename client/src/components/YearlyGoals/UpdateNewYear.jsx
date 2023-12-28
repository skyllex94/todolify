import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { saveUserData } from "../../redux/dataSlice";
import { addYearAsync, removeYearAsync } from "../../redux/goalsSlice";

export default function NewYear({ user_id }) {
  const dispatch = useDispatch();
  const local_data = useSelector((state) => state.data);

  const addNewYear = async () => {
    const goals = local_data.goals;
    const new_year = parseInt(goals[goals.length - 1].year + 1);
    const res = await dispatch(addYearAsync({ user_id, new_year }));

    if (res.payload.status === 200) {
      dispatch(saveUserData(res.payload.data.userData));
    }
  };

  const removeLastYear = async () => {
    const goals = local_data.goals;
    const year_to_remove = goals[goals.length - 1];
    const { _id } = year_to_remove;

    if (!_id) return alert("Could not locate the year");

    const res = await dispatch(removeYearAsync({ user_id, year_id: _id }));

    if (res.payload.status === 200) {
      dispatch(saveUserData(res.payload.data.userData));
    }
  };

  return (
    <div className="mr-5 flex flex-col">
      <button onClick={addNewYear} className="ml-5 rounded border p-3">
        <BsPlusLg />
      </button>

      {local_data?.goals?.length <= 1 ? (
        <button
          disabled
          onClick={removeLastYear}
          className="mt-3 ml-5 rounded border bg-gray-100 p-3"
        >
          <FiMinus />
        </button>
      ) : (
        <button
          onClick={removeLastYear}
          className="mt-3 ml-5 rounded border p-3"
        >
          <FiMinus />
        </button>
      )}
    </div>
  );
}
