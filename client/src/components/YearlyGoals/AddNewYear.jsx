import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { saveUserData } from "../../redux/dataSlice";
import { addYearAsync, removeYearAsync } from "../../redux/goalsSlice";

function AddNewYear({ user_id }) {
  const dispatch = useDispatch();
  const local_data = useSelector((state) => state.data);

  // TODO: Rename this component

  const addNewYear = async () => {
    const goals = local_data.goals;
    const new_year = parseInt(goals[goals.length - 1].year + 1);
    const res = await dispatch(addYearAsync({ user_id, new_year, local_data }));

    if (res.payload.status === 200) {
      dispatch(saveUserData(res.payload.data.userData));
    }
  };

  const removeLastYear = async () => {
    const goals = local_data.goals;
    const year_to_remove = goals[goals.length - 1];
    const { _id } = year_to_remove;

    if (!_id) return alert("Could not locate the year");

    const res = await dispatch(
      removeYearAsync({ user_id, year_id: _id, local_data })
    );

    if (res.payload.status === 200) {
      dispatch(saveUserData(res.payload.data.userData));
    }
  };

  return (
    <div className="flex flex-col">
      <button onClick={addNewYear} className="border rounded p-3 ml-5">
        <BsPlusLg />
      </button>

      {local_data?.goals?.length <= 1 ? (
        <button
          disabled
          onClick={removeLastYear}
          className="border bg-gray-100 rounded p-3 mt-3 ml-5"
        >
          <FiMinus />
        </button>
      ) : (
        <button
          onClick={removeLastYear}
          className="border rounded p-3 mt-3 ml-5"
        >
          <FiMinus />
        </button>
      )}
    </div>
  );
}

export default AddNewYear;
