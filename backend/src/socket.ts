import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export const setupSocket = (server: HttpServer) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("Client connected to socket");

        // Simulate real-time pacing data
        let currentSpend = 1200.50;
        const interval = setInterval(() => {
            currentSpend += Math.random() * 5; // Simulate spend tick
            socket.emit("pacing_update", {
                campaignId: 1,
                timestamp: new Date().toISOString(),
                spend: currentSpend,
                targetSpend: 1500.00, // Target for this point in time
            });
        }, 1000);

        socket.on("disconnect", () => {
            clearInterval(interval);
            console.log("Client disconnected from socket");
        });
    });

    return io;
};
