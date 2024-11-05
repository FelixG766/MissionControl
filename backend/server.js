import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// Middleware

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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