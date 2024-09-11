
# NodeResourceAPI

**NodeResourceAPI** is a secure and simple RESTful API built with Node.js and Express.js for managing resources, user authentication, and authorization. The project uses MongoDB as the database, with JWT (JSON Web Tokens) for secure user authentication. Additionally, the API includes geo-restriction middleware to limit access based on geographic location, as well as robust error handling and soft delete functionality for resources.

## Features
- **User Authentication**: Provides secure registration, login, and JWT-based authentication.
- **Resource Management**: API endpoints for creating, reading, updating, and soft-deleting resources.
- **Geo-Restriction Middleware**: Restrict API access based on the user's geographic location.
- **Error Handling**: Centralized error handling for clean and consistent error responses.
- **Soft Delete**: Resources can be soft-deleted, allowing you to hide data without fully deleting it from the database.

## Project Structure
```plaintext
NodeResourceAPI/
├── config/
│   ├── db.js                  # MongoDB connection setup
│   ├── jwt.js                 # JWT configuration
│
├── controllers/
│   ├── adminController.js      # Admin-related functionality
│   ├── authController.js       # User authentication (login, register)
│   ├── userController.js       # User-related functionality
│
├── middlewares/
│   ├── authMiddleware.js       # Authentication middleware
│   ├── errorHandler.js         # Centralized error handling
│   ├── geoRestrict.js          # Geo-restriction middleware
│   ├── roleMiddleware.js       # Role-based access control middleware
│   ├── softDelete.js           # Middleware to implement soft deletion
│   ├── timestamp.js            # Middleware for timestamp
│
├── models/
│   ├── Resource.js             # Resource schema definition
│   ├── userModel.js            # User schema definition
│
├── routes/
│   ├── authRoutes.js           # Routes for authentication
│   ├── resourceRoutes.js       # Routes for resource management
│   ├── userRoutes.js           # Routes for user management
│
├── services/
│   ├── authService.js          # JWT token generation and verification logic
│
├── utils/
│   ├── validator.js            # Utility functions for input validation
│
├── .env                        # Environment variables (not to be shared publicly)
├── server.js                   # Entry point of the application
├── README.md                   # Documentation for the project

```

## Installation

### Prerequisites
- **Node.js** and **npm** installed on your system.
- **MongoDB** running locally or remotely (using MongoDB Atlas, for instance).
- **MongoDB Compass** (optional for visual database management).

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/arkanathan/digistar-assignments
   ```

2. Navigate to the project directory:

   ```bash
   cd NodeResourceAPI
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root of your project with the following content:

   ```bash
   MONGO_URI=mongodb://localhost:27017/yourDatabaseName
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. Open your browser or Postman and test the API on `http://localhost:5000`.

## API Endpoints

### User Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in with an existing user.
- **POST** `/api/auth/refresh-token`: Refresh the JWT token.

### Resource Management

- **POST** `/api/resource`: Create a new resource (requires authentication).
- **GET** `/api/resource`: Retrieve all non-deleted resources (requires authentication).
- **PUT** `/api/resource/:id`: Update a specific resource by ID (requires authentication).
- **DELETE** `/api/resource/:id`: Soft delete a resource (requires authentication).

## Usage Example

Example request for user registration:

```bash
POST /api/auth/register
Content-Type: application/json

{
    "email": "user@example.com",
    "username": "user123",
    "password": "password"
}
```

## Contributing

Contributions are welcome! If you'd like to contribute, feel free to submit a pull request or open an issue.

## Authors

- **Nathan Dava Arkananta** - [arkanathan](https://github.com/arkanathan)
