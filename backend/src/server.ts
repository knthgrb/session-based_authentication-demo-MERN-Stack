import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, () => {
      console.log("server running at port " + port);
    });
  })
  .catch(console.error);
