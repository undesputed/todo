import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  //   if (!process.env.JWT_KEY) {
  //     throw new Error("JWT Must be defined");
  //   }

  //   if (!process.env.MONGO_URI) {
  //     throw new Error("MONGO_URI must be defined");
  //   }

  try {
    await mongoose.connect(
      "mongodb+srv://eirracyu12:oycophqCiHBy4Xvk@todolist.1y2efab.mongodb.net/test"
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("Listening on PORT 3000");
  });
};

start();
