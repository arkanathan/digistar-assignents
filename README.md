
# Digistar Class Assignments Collection

This repository contains a collection of assignments completed during the Digistar Class program. Each assignment is organized into its own folder, containing all the necessary files, documentation, and code. The purpose of this repository is to showcase the work and learning progress throughout the program.

## Repository Structure
```
digistar-assignments/
├── express-crud-api/
│   ├── controllers/
│   │   ├── models/
│   │   │   └── user.js          # Mongoose schema for User
│   │   └── userController.js    # Handles user-related operations
│   ├── middlewares/
│   │   ├── auth.js              # Authentication middleware
│   │   ├── checkOwnership.js    # Ensures users can only modify their own data
│   │   ├── checkExistingUser.js # Checks if the user name or email already exists
│   │   └── userValidator.js     # Validates user input data
│   ├── routes/
│   │   └── userRoutes.js        # Defines routes for user operations
│   ├── app.js                   # Main entry point of the application
│   └── package.json             # Project dependencies and scripts
│
├── NodeResourceAPI/
│   ├── README.md   # Documentation for NodeResourceAPI Assignment
│   ├── server.js   # Main server file for the API
│   ├── config/     # Contains configuration files like db.js and jwt.js
│   ├── controllers/  # API controllers like authController and userController
│   ├── middlewares/  # Middlewares like authMiddleware, geoRestrict, and errorHandler
│   ├── models/       # Mongoose models for the project
│   ├── routes/       # Route files for authentication, resources, and users
│   ├── services/     # Service layer for business logic (JWT, etc.)
│   ├── utils/        # Utility functions for validation
│   └── .env          # Environment configuration file
```

Each folder corresponds to a specific assignment and includes:
- **README.md**: A detailed description of the assignment, including objectives, requirements, and outcomes.
- **Code Files**: All scripts and code required to complete the assignment.
- **Documentation**: Any additional documentation or resources related to the assignment.

## How to Use This Repository
1. Navigate to the assignment folder you are interested in.
2. Review the `README.md` file in each folder for specific details about the assignment.
3. Explore the code files to understand the implementation.

## Contributions
This repository is primarily for educational purposes and to document the assignments completed during the Digistar Class program. Contributions are welcome if they align with the educational goals of the repository.

---

### Author Information

This repository and all the assignments within it were written and completed by **Nathan Dava Arkananta** (!Foxtrot) as part of the Digistar Class program.
