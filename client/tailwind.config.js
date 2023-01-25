/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      minWidth: {
        24: "6rem",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
