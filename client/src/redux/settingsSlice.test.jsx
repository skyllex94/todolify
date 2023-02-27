import { startFromSunday } from "./settingsSlice";
import Settings from "../components/Settings/Settings";
import { render, screen } from "@testing-library/react";

describe("Return false if starting from Monday, and true if Sunday", () => {
  render(<Settings />);
  const checkToggle = screen.getElementByLabel("change-week-start");
  console.log("checkToggle:", checkToggle);

  // Start here: Figure out how to test jsx files with Jest
  const { state, action } = startFromSunday;
  //   console.log("action:", action);

  expect(startFromSunday).toBe(false);
});
