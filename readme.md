# TasksJS

A full-stack task management application built with the MERN stack.

TasksJS allows users to create and organize task lists, manage individual tasks, and securely access their personal workspace through JWT-based authentication.

---

## Features

### Authentication

* User registration
* User login
* Password change
* JWT-based authentication
* Protected routes
* Automatic logout on unauthorized API responses (401)

### Task Management

* Create tasks
* Edit task titles
* Mark tasks as completed or pending
* Delete tasks

### List Management

* Create task lists
* Rename task lists
* Delete task lists
* Automatic removal of associated tasks when deleting a list

### User Experience

* Responsive interface
* Real-time UI updates with React Query
* Toast notifications for user feedback
* Confirmation dialogs for destructive actions

---

## Tech Stack

### Frontend

* React
* TypeScript
* React Router
* React Query
* Axios
* Tailwind CSS
* SweetAlert2
* React Hot Toast

### Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)

---

## Project Structure

```text
TasksJS/
├── client/
│   ├── src/
│   │   ├── api → Axios configuration and API communication setup.
│   │   ├── assets → Static assets such as images and icons.
│   │   ├── components → Reusable UI components.
│   │   ├── context → Global state management using React Context.
│   │   ├── hooks → Custom React Query mutation hooks.
│   │   ├── layout → Shared application layouts.
│   │   ├── pages → Page-level components.
│   │   ├── routes → Routing and route protection logic.
│   │   ├── services → Frontend business logic and API calls.
│   │   └── types → TypeScript type definitions.
│   ├── app.css
│   ├── app.tsx
│   ├── main.tsx
│   ├── .env
│   ├── package.json
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── config → Application and database configuration.
│   │   ├── controllers → Request handling and HTTP response logic.
│   │   ├── middlewares → Authentication, error handling, and request processing.
│   │   ├── models → MongoDB/Mongoose data models.
│   │   ├── routes → API endpoint definitions.
│   │   ├── services → Business logic layer.
│   │   ├── types → Custom TypeScript type definitions.
│   ├── appp.ts
│   ├── server.ts
│   ├── .env
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/amaya2200/TasksJS.git
cd TasksJS
```

---

### Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example` as a reference.

Start the development server:

```bash
npm run dev
```

---

### Frontend Setup

Navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example` as a reference.

Start the development server:

```bash
npm run dev
```

---

## Environment Variables

### Backend

Example:

```env
PORT=
MONGODB_URI=
JWT_SECRET=
```

### Frontend

Example:

```env
VITE_API_URL=
```

Refer to the included `.env.example` files for the complete configuration.

---

## Learning Outcomes

This project was developed to strengthen knowledge and practical experience in:

* Full-stack application development
* REST API design
* Authentication and authorization
* React Query state synchronization
* Context API
* TypeScript
* MongoDB data modeling
* Client-server communication using Axios
* Frontend routing and protected routes

---

## License

This project is intended for educational and portfolio purposes.