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

// Simulate slow individual endpoints
app.get("/api/campaign", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Relativly fast
    res.json({ id: 1, name: "Summer Sale 2026", status: "Active" });
});

app.get("/api/pacing", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Medium
    res.json({ currentSpend: 1250.40, targetSpend: 1500.00, efficiency: "82.5%" });
});

app.get("/api/charts", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 3500)); // Slow data
    res.json({
        historicalData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
            spend: 50 + Math.random() * 50
        }))
    });
});

app.get("/api/logs", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Super slow audit logs
    res.json([
        { id: 1, action: "Budget increased", user: "Admin", time: "2h ago" },
        { id: 2, action: "Bid adjusted", user: "System", time: "4h ago" },
        { id: 3, action: "Creative paused", user: "Manager", time: "1d ago" }
    ]);
});

httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
