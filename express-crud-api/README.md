
# Simple CRUD API with Express and Node.js

This project is a basic implementation of a CRUD (Create, Read, Update, Delete) API built using **Express** and **Node.js**. The API allows for user management, including creating new users, retrieving user data, updating user information, and deleting users. This project uses **MongoDB** as the database, **Mongoose** for object data modeling, and includes basic validation, authentication, and ownership checks.

## Features
- **User Registration**: Allows new users to register with a name, email, and password.
- **User Authentication**: Basic authentication middleware to ensure only logged-in users can access or modify their data.
- **Data Validation**: Input validation for name, email, and password using express-validator.
- **CRUD Operations**:
  - **Create**: Register a new user.
  - **Read**: Fetch all users or a specific logged-in user's data.
  - **Update**: Update user details, ensuring that only the user can modify their data.
  - **Delete**: Delete user account, with checks to ensure only the user can delete their account.
- **Middleware**: Includes middleware for authentication, ownership checks, and input validation.

## Project Structure
```
.
├── controllers
│   ├── models
│   │   └── user.js          # Mongoose schema for User
│   └── userController.js    # Handles user-related operations
├── middlewares
│   ├── auth.js              # Authentication middleware
│   ├── checkOwnership.js    # Ensures users can only modify their own data
│   ├── checkExistingUser.js # Checks if the user name or email already exists
│   └── userValidator.js     # Validates user input data
├── routes
│   └── userRoutes.js        # Defines routes for user operations
├── app.js                   # Main entry point of the application
└── package.json             # Project dependencies and scripts
```

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/arkanathan/digistar-assignments/express-crud-api
   ```
2. Navigate to the project directory:
   ```bash
   cd simple-crud-api-express
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up MongoDB and configure the connection string in `app.js`:
   ```javascript
   mongoose.connect('mongodb://localhost:27017/mydatabase');
   ```
5. Run the server:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000`.

## API Endpoints
- `POST /api/users`: Register a new user.
- `GET /api/users`: Get all users (password excluded).
- `GET /api/users/current`: Get the currently logged-in user's data.
- `PUT /api/users/current`: Update the currently logged-in user's data.
- `DELETE /api/users/current`: Delete the currently logged-in user's account.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss changes.

---

### Assignment Information

This project is an assignment for the **Digistar Class** program. The code was written by **Nathan Dava Arkananta**.
