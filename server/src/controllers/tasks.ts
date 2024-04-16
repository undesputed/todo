import { Request, Response } from "express";
import { Todo } from "../models/tasks";

exports.create = async (req: Request, res: Response) => {
  if (!req.body.title && !req.body.description) {
    res.status(400).send({ message: "Title or Description Cannot be empty!!" });
  }

  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    completed: req.body.completed,
    createdAt: req.body.createdAt,
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
};

exports.findAll = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.find();
    res.status(200).json(todo);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

exports.findOne = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

exports.update = async (req: Request, res: Response) => {
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
};

exports.destroy = async (req: Request, res: Response) => {
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
};
