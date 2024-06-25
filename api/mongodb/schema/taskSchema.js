import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  time: { type: Number, required: true },
  difficulty: {
    type: String,
    default: "Easy",
  },
  priority: {
    type: String,
    default: "Low",
  },
  type: {
    type: String,
    default: "entry",
  },
});
const Task = mongoose.model("Task", TaskSchema);
export default Task;
