import dayjs from "dayjs";

// Decode the fetched JWT to get the user id in order to take his todos
export const decodeJWT = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const getDayOfWeek = (date) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayToConvert = date.getUTCDay();

  let day = weekday[dayToConvert];
  return day;
};

function addDays(date, days) {
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() + days);
  return dateCopy;
}

export const formatDate = (date) => {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + "/" + mm + "/" + yyyy;
};

export const getDate = (addedDays = 0) => {
  const today = new Date();

  const addedDaysDate = addDays(today, addedDays);
  const dayOfWeek = getDayOfWeek(addedDaysDate);

  const formattedDate = formatDate(addedDaysDate);

  const splitDate = formattedDate.split("/");
  const day = parseInt(splitDate[0]);
  const month_year = splitDate[1] + "/" + splitDate[2];

  return { day, month_year, dayOfWeek };
};

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);

  const year = dayjs().year();
  const monthName = dayjs().month(month);

  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currMonthIdx = 0 - firstDayOfTheMonth;

  const rows = 5;
  const monthMatrix = new Array(rows).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currMonthIdx++;
      return dayjs(new Date(year, month, currMonthIdx));
    });
  });
  return { monthMatrix, currMonthIdx: month, year, monthName };
}
