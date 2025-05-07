# MERN CRUD Application

A simple MERN (MongoDB, Express.js, React, Node.js) stack application for performing CRUD operations.

## Project Structure

The project is divided into two main parts:

-   `client/`: Contains the React frontend application.
-   `server/`: Contains the Node.js/Express.js backend API.

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (includes npm)
-   MongoDB (running locally or accessible via a connection string)

## Setup and Running

Follow these steps to set up and run the application:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Sayantand938/mern-curd.git
    cd mern-curd
    ```
    *(Replace `<repository_url>` with the actual URL of your repository)*

2.  **Install Server Dependencies:**

    Navigate to the `server` directory and install the required packages.

    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies:**

    Navigate to the `client` directory and install the required packages.

    ```bash
    cd ../client
    npm install
    ```

4.  **Configure Environment Variables (Optional but Recommended):**

    You might need to set up environment variables for your MongoDB connection string and other configurations. Create a `.env` file in the `server` directory and add your variables.

    ```dotenv
    # Example .env file in server/
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```
    *(Replace `your_mongodb_connection_string` with your actual MongoDB connection string)*

5.  **Run the Backend Server:**

    Navigate back to the `server` directory and start the server.

    ```bash
    cd ../server
    npm start
    ```
    The server should start and listen on the specified port (defaulting to 5000 if not set in `.env`).

6.  **Run the Frontend Client:**

    Navigate to the `client` directory and start the React development server.

    ```bash
    cd ../client
    npm start
    ```
    The client application should open in your browser, usually at `http://localhost:5173/` (or another port if configured differently in `client/vite.config.ts`).

Now you should have both the backend and frontend running, and you can interact with the application.