import mongoose, { Schema } from "mongoose";

const nodeSchema = new Schema(
  {
    name: { type: String, required: true },
    nameParentNode: { type: String},
    level: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    admin: { type: String, required: true },
  },
  { timestamps: true }
);

const Node = mongoose.model("Node", nodeSchema);

export default Node;