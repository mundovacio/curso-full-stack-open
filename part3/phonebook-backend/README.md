# Phonebook Backend App (Part 3)

This project is the backend for the Phonebook application, built with Node.js and Express as part of the [Full Stack Open](https://fullstackopen.com/) course by the University of Helsinki.

This server is available at [https://curso-full-stack-open-9es0.onrender.com](https://curso-full-stack-open-9es0.onrender.com)

## Overview

The Phonebook backend provides a RESTful API for managing contacts with names and phone numbers. It supports creating, reading, updating, and deleting entries, and can be connected to the frontend app from Part 2.

## How to Run

1. **Install dependencies:**

    ```sh
    npm install
    ```

2. **Start the backend server:**

    ```sh
    npm run dev
    ```

    The server will be available at [http://localhost:3001](http://localhost:3001).

## API Endpoints

- `GET /api/persons` – Get all contacts
- `GET /api/persons/:id` – Get a single contact by ID
- `POST /api/persons` – Add a new contact
- `PUT /api/persons/:id` – Update an existing contact
- `DELETE /api/persons/:id` – Delete a contact
- `GET /info` – Get info about the phonebook

## Submitting Exercises

Submit your completed exercises through the official portal:  
[Full Stack Open Submission Portal](https://studies.cs.helsinki.fi/stats/courses/fullstackopen/submissions)

## Additional Notes

- Node.js version: 18.x or newer is recommended.
- You can connect this backend to the frontend app from Part 2.
- For production, remember to configure environment variables and use a real database as described in the course material.

---

Happy coding!