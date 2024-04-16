import express from "express";
import { currentUser } from "../middleware/current-user";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send({ currentUser: "Hello world" });
  // res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
