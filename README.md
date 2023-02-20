## Todolify - Productivity Timeblocking and Categorization Todo Web App

Todolify is a full-stack (MERN) productivity tool, designed to present a new way of looking at your daily tasks as putting them
in things called 'buckets' (different categories) from which you separate concerns, and in terms focus on a single category at a time, which is time blocked to be able to focus on it. In addition there are several other productivity management tools available for managing long-scale projects and goals.

## Usage

Link to the web app can be found at [todolify.up.railway.app](https://todolify.up.railway.app/).

## Compatibility

Modern browsers, as well as mobile, tablet screens with responsive design.

## Navigation

The landing page will prompt you to create your account, which in term established connection to the distributed cloud-based NoSQL database, hosted on Atlas, encrypt your registration sensitive information, with bcrypt, returning a JWT with your newly created "user_id."

![landing_page](/client/src/assets/readme/2.png)

From there, you will be redirected to the main functionality of the page, if successful. The layout of the web app includes a navigation header and sticky side menu from which to move around and through the different functionalities. The 'Weekly List' generates a week's worth of todos dynamically, with all of its categories and tasks for each day, which it retrieves from the DB and stores in Redux store, through redux-toolkit, and updates when changes have occurred for efficient request calls, only on data being changed.
The tasks are being put in 'buckets' which serve as containers that are time blocked for you to work on. You have CRUD flexibility for personalization + icons and motion design, with Framer Motion, and UI/UX design pattern enabled by Tailwind. Included on registration is a video instruction, explaining the whole process which is made responsive for different scale ratios.

![weekly_list](/client/src/assets/readme/4.png)

The 'Events' page features the ability to create unique monthly events, and schedule them. With a design similar to Google Calendar, you create your events, which are integrated array lists for a particular day that will be dynamically created upon posting an event, with the to-do list for the day.
Furthermore, when creating a new event, it will be populated for the day, if you return back to the 'Weekly List' from which you will be able to toggle it when completed. The months' array is also dynamically created and fetched on month changes in the front end, from which it will go through the state-managed data structure and fetch any days which have events in them.

![events](/client/src/assets/readme/5.png)

The 'Yearly Goals' will introduce you to creating and managing your goals, and is part of the app intended to link the long-term goals with the short-term milestones. The yearly goals can be very tailored to a specific field of development you intend to focus on, or broad annual goal setting accounting for all aspects of life. In either case, it will be helpful to track it.
Goals are a separate array structure to which new years are added when requested with its goal list inside. All query CRUD requests are made to alter, and update the whole DB structure on 'todos' and return back the updated DB which is retrieved back through redux, to the front-end and updated in the UI.

![yearly_goals](/client/src/assets/readme/6.png)

Through 'Settings' you augment the secured user information, going through middleware and receiving back the confirmation for change approval. The password info, is now being directly retrieved, but accessed when there's a need for pass change, in which case the new password is not being stored anywhere, but sent to the Express backend, encrypted, and then changed and middleware validated with the new one.

![settings](/client/src/assets/readme/7.png)

You also have additional functionalities like personalization settings and deletion of profiles with all of its data.

## Contact

For suggestions and improvements, please contact me @kkanchev94@gmail.com

## License

The MIT License (MIT)

Copyright (c) 2022 Kamen Kanchev

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
