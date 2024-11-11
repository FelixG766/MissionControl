import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import errorHandler from "./helpers/auth/errorHandler.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// Middleware for parsing JSON bodies and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Cross-Origin Resource Sharing (CORS) for allowing requests from other origins
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Middleware to parse cookies attached to the client request
app.use(cookieParser());

// Error handling middleware - global
app.use(errorHandler);

const routeFiles = fs.readdirSync("./routes");

routeFiles.forEach((file) => {
    import(`./routes/${file}`)
        .then((route) => {
            app.use("/api/v1", route.default);
        })
        .catch((error) => {
            console.log("Failed to load route files", error);
        });
})

const server = async () => {

    try {
        await connect();
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });

    } catch (error) {
        console.log("Failed to start server", error.message);
        process.exit(1);
    }
}

server();