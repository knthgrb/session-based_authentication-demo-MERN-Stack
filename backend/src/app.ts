import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./routes/user.route";
import session from "express-session";
import env from "./utils/validateEnv";
import MongoStore from "connect-mongo";

const app = express();

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
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
