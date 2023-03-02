import { getDate, getMonth } from "./functions";

test("getDate returns a none null object", () => {
  const dateFunc = getDate(0);
  expect(dateFunc).not.toBeNull();
});

test("Get currMonthIdx correctly", () => {
  const currMonth = getMonth(0, false);
  expect(currMonth.currMonthIdx).toBe(0);
});
