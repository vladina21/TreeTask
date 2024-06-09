import mongoose from "mongoose";
import { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true
    },
    date: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      default: "To Do",
      enum: ["To Do", "In Progress", "Completed"],
    },

    timeline: {
      type: {
        type: String,
        default: "assigned",
        enum: [
          "assigned",
          "in progress",
          "completed",
          "bug",
          "commented",
          "started",
        ],
      },
      activity: {
        type: String,
      },
      date: {
        type: Date,
        default: new Date(),
      },
      by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },

    subTasks: [
      {
        title: String,
        date: Date,
        tag: String,
      },
    ],

    assets: [String],
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
