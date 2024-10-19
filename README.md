# Task Manager App - Backend

A robust task management application built with Node.js, Express, and MongoDB. This app allows users to create tasks, assign them to categories, and track their progress.

## Features

- User authentication (signup, login, logout)
- Create, read, update, and delete tasks
- Categorize tasks
- Filter tasks by category and status
- Responsive design for mobile and desktop

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- MongoDB (v4.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:  https://github.com/samirdhoran2000/task-manager.git


2. Navigate to the project directory: cd task-manager

3. Navigate to server folder from root directory - root directory is task-manager


4. Install the dependencies: npm install


5. Create a `.env` file in the root directory and add the following:

MONGODB_URI=mongodb://127.0.0.1:27017/task-manager

PORT=3000

JWT_SECRET=jwt-secret


Replace `your_mongodb_connection_string` with your MongoDB connection string and `jwt_secret` with a secret key for session management.

5. Start the server: npm start


The app should now be running on `http://localhost:3000`.

## Usage

1. Register a new account or log in if you already have one.
2. Create new tasks by clicking on the "Add Task" button.
3. Assign categories to your tasks for better organization.
4. Update task status or edit task details as needed.
5. Filter tasks by category or status using the provided options.
6. Delete tasks when they are no longer needed.

## API Endpoints

- `POST /signup`: Create a new user account
- `POST /login`: Authenticate user and create session
- `POST /logout`: End user session
- `GET /tasks`: Retrieve all tasks for the logged-in user
- `POST /tasks`: Create a new task
- `PUT /tasks/:id`: Update an existing task
- `DELETE /tasks/:id`: Delete a task
- `GET /categories`: Retrieve all categories for the logged-in user
- `POST /categories`: Create a new category
- `DELETE /categories/:id`: Delete a category

## Contributing

Contributions to the Task Manager App are welcome. Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

If you want to contact me, you can reach me at `samirdhoran2000@gmail.com`.

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)




# Task Manager App - Frontend

1. Navigate to client folder from the root directory (root directory is task-manager)

2. cd client

3. Install the dependencies: npm install

4. Update the VITE_API_URL=localhost:3000 OR you backend API Endpoints

5. After setting up the env variable. run the project using : npm run dev
