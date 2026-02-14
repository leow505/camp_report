import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
