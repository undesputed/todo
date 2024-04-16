import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import cors from "cors";

import { currentUserRouter } from "./routes/current-user";
import { singupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { signinRouter } from "./routes/signin";
import { errorHandler, NotFoundError } from "@caytickets/common";

import { tasksRouter } from "./routes/tasks";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

const corsOptions = {
  origin: "http://localhost:8080",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: "*",
};

app.use(cors(corsOptions));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(singupRouter);

app.use(tasksRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
