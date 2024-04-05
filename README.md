You can access the live application at the following URL:

🔗 [Gemini Chatbot Live Site](https://gemini-chatbot-0day.onrender.com)

> ⚠️ **Please Note:** The deployment is on an instance which may spin down during periods of inactivity. This could result in cold starts, potentially delaying responses by 50 seconds or more.

This is a full-stack MERN project that integrates Google's Gemini AI to provide a chatbot service. The project is divided into two main parts: the client-side and the server-side.

## Client

The client-side of the application is built with React. It is located inside the server directory under the `client` folder. It uses Vite for a build tool and Tailwind CSS for styling. The main entry point of the application is `main.jsx`. The application's components are located in the `components` directory.

## Server

The server-side of the application is built with Node.js and Express. It uses MongoDB as a database, with Mongoose for object modeling. The main entry point of the server is `server.js`. The server's routes are located in the `routes` directory, and the controllers are located in the `controllers` directory.

## 🚀 Installation

To install the dependencies for the client and server, navigate to the server directory and run `npm run build`.

## 🖥️ Running the Application Locally

Before running the application locally, you need to set up your environment variables in a `.env` file in the server directory. The file should contain the following:

- `API_KEY`: Your Google Gemini's API key
- `JWT_KEY`: Your phrase for JSON Web Token
- `DB_URI`: Your MongoDB database URI

Once you have set up your `.env` file, you can start the application by navigating to the server directory and executing the following command: `npm run start`.