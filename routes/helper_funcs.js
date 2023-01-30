exports.getMonthIdx = function getMonthIdx(month_year, fetchedTodoList) {
  if (isEmpty(fetchedTodoList)) return null;

  try {
    if (month_year) {
      const monthIdx = fetchedTodoList.date.findIndex(
        (curr) => curr.month_year == month_year
      );

      if (monthIdx < 0) return "No month found in DB";
      return monthIdx;
    }
  } catch (err) {
    return null;
  }
};

exports.idxIsValid = function idxIsValid(idx, timePeriod) {
  if (idx === `No ${timePeriod} found in DB`) {
    const error = `Error while deleting, ${timePeriod}Idx doesn't exist`;
    return { isValid: false, error };
  }

  if (idx === null) {
    const error = `Error while deleting ${timePeriod}, userTodoList may be empty`;
    return { isValid: false, error };
  }

  return { isValid: true };
};

function isEmpty(fetchedTodoList) {
  if (fetchedTodoList) return false;
  return true;
}

exports.getDayIdx = function getDayIdx(day, monthIdx, fetchedTodoList) {
  if (isEmpty(fetchedTodoList)) return null;

  try {
    if (day) {
      const dayIdx = fetchedTodoList.date[monthIdx].days.findIndex(
        (curr) => curr.day == day
      );
      if (dayIdx < 0) return "No day found in DB";
      return dayIdx;
    }
  } catch (err) {
    return null;
  }
};
