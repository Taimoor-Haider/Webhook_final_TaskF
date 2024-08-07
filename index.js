import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectToDatabase from "./config/db.js";
import messageRouter from "./route/messageRoute.js";
import pipelineRoutes from "./route/pipelineRoute.js";
import sourceRoutes from "./route/sourceRoute.js";
import destinationRoutes from "./route/destinationRoute.js";

const corsOptions = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

dotenv.config();
const app = express();
app.use(express.json());
app.options("", cors(corsOptions));
app.use(cors(corsOptions));
connectToDatabase();

const PORT = process.env.PORT || 3000;
// Middleware for logging HTTP requests

app.get("/", (req, res) => {
  res.send("Hello, Welcome to the Message API!");
});
app.use(morgan("dev"));
app.use("/api", messageRouter);
app.use("/api", pipelineRoutes);
app.use("/api", sourceRoutes);
app.use("/api", destinationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
