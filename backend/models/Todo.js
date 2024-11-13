import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Todo", todoSchema);
