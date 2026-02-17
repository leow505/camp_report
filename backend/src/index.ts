import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { createServer } from "http";
import { setupSocket } from "./socket";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

// Socket.io integration
setupSocket(httpServer);

// API Endpoints
app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
});

httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
