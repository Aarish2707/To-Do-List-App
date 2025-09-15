# Modern Todo App

A full-stack todo application built with React.js frontend and Node.js backend, featuring user authentication and a modern UI.

## Features

- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Create, read, update, and delete todos
- ✅ Modern, responsive UI
- ✅ Task completion tracking
- ✅ User-specific todos

## Tech Stack

**Frontend:**
- React.js 18
- React Router for navigation
- Axios for API calls
- Modern CSS with gradients and animations

**Backend:**
- Node.js with Express
- JWT for authentication
- bcryptjs for password hashing
- MongoDB with Mongoose

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Register a new account or login with existing credentials
3. Start adding and managing your todos!

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Login user
- `GET /api/todos` - Get user's todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update todo completion status
- `DELETE /api/todos/:id` - Delete a todo

## Project Structure

```
├── backend/
│   ├── server.js          # Express server with MongoDB
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main App component
│   │   └── index.js       # React entry point
│   └── package.json       # Frontend dependencies
└── README.md
```