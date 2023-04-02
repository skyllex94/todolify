var push = require("web-push");

const publicVapidKey =
  "BFt1wp7hs6lZu_zeV59YpHaBKADr4mQal6pYJz-PqkIJM-ybL8nWaeTSfDpQAivuYx65cvyQ1o33uW3rJYSbfYs";

const privateKey = "BHeA-PFp9SN-1VZVYFQWWgxMeH0JAhNBJX-WAmnf0bA";

push.setVapidDetails("mailto:test@gmail.com", publicVapidKey, privateKey);

let sub = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/d5NS28RzPr0:APA91bFXFec4jtNrnFqh1F8_XKW7BQ7enPEw8orEBbusgw6xFcwMHnXLhmyKUA4ZsF5b8QArzF95gT8xY3CEEpLtMKrGnJzIcCw3JOOjGKNN4YWX74pP7q8NEE8eJbrbFA5opZu-lz3i",
  expirationTime: null,
  keys: {
    p256dh:
      "BNZ8H5h3S5hczUU2EGqxvVKjEkZpo9BqMCWrXVWYqusRX-iHzxw9_gUCDpcyLoP6_YonDTJq7SHP0kvujSoDU5s",
    auth: "ar-c90uaVkDViZlzWwdzpw",
  },
};

push.sendNotification(sub, "test message");
