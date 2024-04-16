import express, { Request, Response } from "express";
import { Todo } from "../models/tasks";

const router = express.Router();

router.get("/api/tasks", async (req: Request, res: Response) => {
  try {
    const todo = await Todo.find();
    res.status(200).json(todo);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/api/tasks/:id", async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

router.get(
  "/api/tasks/author/:authorId",
  async (req: Request, res: Response) => {
    try {
      const todos = await Todo.find({ author: req.params.authorId });
      res.status(200).json(todos);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post("/api/tasks", async (req: Request, res: Response) => {
  if (!req.body.title && !req.body.description) {
    res.status(400).send({ message: "Title or Description Cannot be empty!!" });
  }

  const todo = Todo.build({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.completed,
    createdAt: req.body.createdAt,
    author: req.body.author,
  });

  await todo
    .save()
    .then((data: any) => {
      res.send({
        message: "Tasks Created Successfully!",
        todo: data,
      });
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating Tasks",
      });
    });
});

router.patch("/api/tasks/:id", async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await Todo.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data: any) => {
      if (!data) {
        res.status(404).send({
          message: `Tasks not found.`,
        });
      } else {
        res.send({
          message: "Tasks updated successfully.",
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

router.patch("/api/tasks/status/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (status === undefined) {
      return res
        .status(400)
        .json({ message: "Status field is required for update." });
    }

    const updatedTask = await Todo.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully.", updatedTask });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/api/tasks/:id", async (req: Request, res: Response) => {
  await Todo.findByIdAndRemove(req.params.id)
    .then((data: any) => {
      if (!data) {
        res.status(404).send({
          message: `Tasks Not Found`,
        });
      } else {
        res.send({
          message: "Tasks Deleted Successfully!!",
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

export { router as tasksRouter };
