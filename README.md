# MERN CRUD Application

A simple full-stack application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) to perform basic **Create, Read, Update, and Delete (CRUD)** operations.

---

## 🗂️ Project Structure

```
mern-crud/
├── client/   # React frontend
└── server/   # Node.js + Express backend API
```

---

## ✅ Prerequisites

Before getting started, make sure you have the following installed on your system:

* **Node.js** (with npm)
* **MongoDB** (running locally or via a remote connection)

---

## 🚀 Getting Started

Follow the steps below to set up and run the application:

### 1. Clone the Repository

```bash
git clone https://github.com/Sayantand938/mern-curd.git
cd mern-curd
```

> Replace the URL with your fork if needed.

---

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

---

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

### 4. Configure Environment Variables

Create a `.env` file in the `server/` directory to define your environment variables:

```dotenv
# server/.env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

> Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

---

### 5. Run the Backend Server

```bash
cd ../server
npm start
```

The backend will start on `http://localhost:5000` (or the port defined in `.env`).

---

### 6. Run the Frontend Client

```bash
cd ../client
npm start
```

By default, the React app should open in your browser at `http://localhost:5173/` (configured in `vite.config.ts`).

---

## 🌐 Usage

Once both servers are running:

* Navigate to the frontend URL.
* Perform Create, Read, Update, and Delete operations.
* Changes will reflect in your MongoDB database.

---

## 🛠️ Technologies Used

* **Frontend**: React, Vite, Axios
* **Backend**: Express.js, Node.js, MongoDB, Mongoose

---

## 📦 Deployment

For deployment:

* Use services like **Render**, **Vercel**, **Netlify**, or **Heroku**.
* Update MongoDB connection to use **MongoDB Atlas** if needed.
* Serve the React build using Express for a single deployment target (optional).

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---


