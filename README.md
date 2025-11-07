📝 Fullstack Task Management System

A MERN stack Task Management System that allows users to register, log in, and manage tasks with full CRUD operations. Each user can add, edit, delete, and track tasks based on their status — Yet to Start, In Progress, or Completed.

🚀 Features

🔐 User Authentication (Register/Login with JWT)

✅ Task CRUD Operations

📊 Status-based Task Categorization

🧠 Backend Validation using Joi

🍪 Secure Cookie-based Auth

🎨 Responsive React Frontend

⚙️ RESTful Express.js API

🧩 Tech Stack

Frontend: React.js, Axios, React Toastify
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt
Database: MongoDB Atlas / Local MongoDB

🗂️ Folder Structure
fullstack-task-manager/
│
├── backend/
│   ├── model/
│   ├── routes/
│   ├── controller/
│   ├── middleware/
│   ├── Validate/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore

⚙️ Setup Instructions

1️⃣ Clone the Repository
git clone https://github.com/Mohitco/fullstack-task-manager.git

cd fullstack-task-manager

2️⃣ Setup Backend

cd backend,
npm install,
npm start

3️⃣ Setup Frontend

cd frontend,
npm install,
npm run dev

4️⃣ Environment Variables

Create a .env file in /backend

PORT=3001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

🔐 Authentication Flow

User registers and receives a JWT cookie

Each request validates token via middleware

Only authenticated users can access task routes


Dashboard with categorized tasks

Task creation and edit modals

Login and signup UI

🤝 Contributing

Feel free to fork and contribute! Open a PR with new features or improvements.

🧑‍💻 Author

Aadarsh Kumar Jha