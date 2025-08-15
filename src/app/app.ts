import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

const allowedOrigins = ["http://localhost"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

// Middlewares
app.use(cors(options));
app.use(express.json());
app.use(morgan("dev"));

// app.use("/api/v1", routes);

export default app;
