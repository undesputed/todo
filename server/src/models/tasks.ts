import mongoose from "mongoose";

interface TodoAttrs {
  title: string;
  description: string;
  dueDate: Date;
  status: number;
  createdAt: Date;
  author: string;
}

interface TodoModel extends mongoose.Model<TodoDoc> {
  build(attrs: TodoAttrs): TodoDoc;
}

interface TodoDoc extends mongoose.Document {
  title: string;
  description: string;
  dueDate: Date;
  status: number;
  createdAt: Date;
  author: string;
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
  },
});

todoSchema.statics.build = (attrs: TodoAttrs) => {
  return new Todo(attrs);
};

const Todo = mongoose.model<TodoDoc, TodoModel>("Todo", todoSchema);

export { Todo };
