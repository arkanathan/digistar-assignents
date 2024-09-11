# NodeResourceAPI

A simple and secure Node.js RESTful API for managing resources, user authentication, and authorization. This project uses MongoDB for data storage and JWT for secure user authentication. Additionally, geo-restriction middleware is implemented to limit access based on geographic location.

## Features
- **User Authentication**: Secure registration, login, and JWT-based authentication.
- **Resource Management**: API endpoints for creating, reading, updating, and deleting resources.
- **Geo-Restriction Middleware**: Limit access to API based on user location.
- **Error Handling**: Centralized error handling for a cleaner codebase.
- **Soft Delete**: Resources can be soft-deleted, preserving data without exposing it in API responses.

## Installation

### Prerequisites
- **Node.js** and **npm** installed on your system.
- **MongoDB** running locally or using a remote MongoDB Atlas instance.
- **MongoDB Compass** (optional for database management).

### Steps
1. Clone the repository:

   ```bash
   git clone https://github.com/arkanathan/digistar-assignments/tree/main/NodeResourceAPI
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
- **GET** `/api/resource`: Get all resources (requires authentication).
- **PUT** `/api/resource/:id`: Update a specific resource (requires authentication).
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

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Authors

- Nathan Dava Arkananta (https://github.com/arkanathan)
