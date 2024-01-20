# To-Do List App Backend

This repository contains the backend implementation for a to-do list app. The code is written in JavaScript using Node.js and Express.js, providing a server that defines API endpoints for CRUD (Create, Read, Update, Delete) operations on tasks.

For the front end of the application, click [HERE](https://github.com/bethjm/taskmanager_frontend).

## Technologies Used

- **Node.js:** A JavaScript runtime that enables the execution of JavaScript code outside of a web browser.

- **Express.js:** A web application framework for Node.js, simplifying the process of building web applications and APIs.

- **dotenv:** A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

- **cors:** A middleware for Express that enables Cross-Origin Resource Sharing, allowing requests to the server from different domains.

- **PostgreSQL:** The code interacts with a PostgreSQL database using the `pg` library to execute SQL queries and manage tasks.

## API Endpoints

1. **GET /api/tasks:** Retrieve all tasks.

2. **GET /api/tasks/:id:** Retrieve a specific task by ID.

3. **POST /api/tasks:** Create a new task.

4. **PUT /api/tasks/:id:** Update a task.

5. **DELETE /api/tasks/:id:** Delete a task.

## Getting Started

1. Clone this repository.

2. Install dependencies using `npm install`.

3. Create a `.env` file and configure the necessary environment variables.

4. Start the server using `npm start`.

The server will be running on the specified port, and you can use the defined API endpoints to interact with the to-do list application.

Feel free to customize and contribute to the project!
