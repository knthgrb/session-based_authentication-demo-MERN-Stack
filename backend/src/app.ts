import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/user.route";
import session from "express-session";
import env from "./utils/validateEnv";
import MongoStore from "connect-mongo";
import { isHttpError } from "http-errors";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

app.use("/api/users", userRoutes);

// FOR INVALID ENDPOINTS
app.use((req, res, next) => {
  next(Error("Endpoint not found!"));
});

// ERROR HANDLER
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    (statusCode = error.status), (errorMessage = error.message);
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
