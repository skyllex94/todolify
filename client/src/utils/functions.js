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

export const getDayOfWeek = (addition) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date();
  let dayToConvert = date.getDay() + addition;
  if (dayToConvert >= 7) dayToConvert = 0;
  let day = weekday[dayToConvert];
  return day;
};

export const formattedDate = (addition) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate() + addition;

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + "/" + mm + "/" + yyyy;

  // import Moment from "moment";
  // return Moment().format("MMM Do, YYYY");
};
