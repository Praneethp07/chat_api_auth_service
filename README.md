# chat_api_auth_service
Chat Microservices Authentication API
Overview

This microservice is an integral part of the Chat application's microservices architecture. It focuses on user authentication and provides endpoints for user sign-up, login, and administrative operations related to user management within different organizations.
Installation

    Clone this repository.
    Install dependencies using npm install.
    Set up your environment variables.
    Run the application using npm start.

Microservices Architecture

This authentication API is part of a larger microservices architecture for the Chat application. Other microservices may include message handling, user profile management, and more.
Usage
Sign Up
Endpoint



    POST /:organizationID/signup

Description

Creates a new user account within the specified organization.
Request Body

    username: User's username
    password: User's password

Login
Endpoint



    POST /:organizationID/login

Description

Logs in a user within the specified organization.
Request Body

    username: User's username
    password: User's password

Update User
Endpoint



    PUT /:organizationID/signup

Description

Updates user information within the specified organization.
Request Body

    username: User's username
    password: User's password

Admin Operations
Get All Users
Endpoint



    GET /admin

Description

Retrieves a list of all users for administrative purposes.
Get User by ID
Endpoint



    GET /admin/:userId

Description

Retrieves user information by user ID for administrative purposes.
Delete User by ID
Endpoint



    DELETE /admin/:userId

Description

Deletes a user account by user ID for administrative purposes.
Environment Variables

    PORT: The port on which the server will run.
    DB_URI: MongoDB connection URI.

Contributing

    Fork the repository.
    Create a new branch for your feature or bug fix.
    Make your changes and submit a pull request.

License

This project is licensed under the MIT License.
