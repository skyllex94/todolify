import { getDate, getMonth } from "./functions";

test("getDate returns a none null object", () => {
  const dateFunc = getDate(0);
  expect(dateFunc).not.toBeNull();
});

test("Get currMonthIdx correctly", () => {
  const currMonth = getMonth(0, false);
  expect(currMonth.currMonthIdx).toBe(0);
});

test("Verify date object", () => {
  const expectedObj = {
    day: expect.any(Number),
    month_year: expect.any(String),
    dayOfWeek: expect.any(String),
  };
  const fetchedDate = getDate(0);
  expect(fetchedDate).toEqual(expectedObj);
});
