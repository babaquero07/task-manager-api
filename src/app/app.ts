import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-front-tawny.vercel.app",
  "https://task-manager-front-tawny.vercel.app/*",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

// Middlewares
app.use(cors(options));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", routes);

export default app;
