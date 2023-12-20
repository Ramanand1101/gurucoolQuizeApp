### Quiz App Readme

This repository contains a Quiz Application built using Express.js and MongoDB. The application allows users to create quizzes, manage quiz status, and handle user authentication.

### Features

- **User Authentication**: Provides user registration and login functionalities using JWT tokens.
- **Quiz Creation**: Allows users to create quizzes with questions, options, and set start/end dates.
- **Quiz Status Management**: Automatically updates quiz statuses (Active/Finished) using cron jobs.
- **API Endpoints**:
  - `/user/register`: Endpoint to register a new user.
  - `/user/login`: Endpoint to authenticate and log in a user.
  - `/quizzes`: Create a new quiz.
  - `/quizzes/active`: Get the active quiz.
  - `/quizzes/:id/result`: Get quiz results.
  - `/quizzes/all`: Get all quizzes.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add required environment variables (e.g., `PORT`, `MONGODB_URI`, `secretkey`).

### Usage

1. Start the application:

```bash
npm start
```

2. Use API endpoints through a tool like Postman or via HTTP requests in your application.

### Dependencies Used

- **Express**: Web application framework for Node.js.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **bcrypt**: Library to hash passwords.
- **jsonwebtoken**: For generating JWT tokens for user authentication.
- **node-cron**: Used for scheduling cron jobs in Node.js.

### Contributors

- [@your-username](https://github.com/Ramanand1101)

### License

This project is licensed under the [MIT License](LICENSE).

Feel free to contribute, raise issues, or suggest improvements!
