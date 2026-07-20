import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";

import {
  getListEpisodes,
  getFilterEpisodes,
  postEpisode,
  patchEpisode,
  deleteEpisode,
} from "./controllers/podscasts-controller";
import { Routes } from "./routes/routes";
import { StatusCode } from "./utils/status-code";

export const app = express();

// Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled for the local demo so external YouTube images can load
  })
);

// Rate Limiting: max 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: "Muitas requisições deste IP, tente novamente após 15 minutos.",
});
app.use(limiter);

// Parse JSON body
app.use(express.json());

// CORS config
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
};
app.use(cors(corsOptions));

// Serve static frontend
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.get(Routes.LIST, getListEpisodes);
app.get(Routes.ESPISODE, getFilterEpisodes);
app.post(Routes.ESPISODE, postEpisode);
app.patch(`${Routes.ESPISODE}/:videoId`, patchEpisode);
app.delete(`${Routes.ESPISODE}/:videoId`, deleteEpisode);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Internal Server Error:", err.message);
  res.status(StatusCode.InternalServerError).json({
    statusCode: StatusCode.InternalServerError,
    message: "Ocorreu um erro interno no servidor.",
  });
});
