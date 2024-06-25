import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  UpdateTask,
} from "../mongodb/model/taskModel.js";

const taskRouter = express.Router();

//CRUP operations

//Create
taskRouter.post("/", async (req, res) => {
  const { name, time, difficulty, priority } = req.body;

  const taskObj = {
    name,
    time,
    difficulty,
    priority,
  };

  try {
    // Check if the task name already exists or not
    // const taskLists = getTask();
    // const anyMatchingTask = taskLists.find((task) => task.name === name);
    // console.log(anyMatchingTask, "yes matching task ");
    // if (anyMatchingTask) {
    //   res.json({
    //     message: "Task already Exist",
    //     data: anyMatchingTask,
    //   });
    // }

    const Task = await createTask(taskObj);
    if (Task) {
      res.status(200).json({
        message: "success",
        data: Task,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//Patch
taskRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log("id", id);
  const updatedTaskType = req.body;

  try {
    const Task = await UpdateTask(id, updatedTaskType);
    if (Task) {
      res.status(200).json({
        message: "success",
        data: Task,
      });
    }
  } catch (error) {
    console.log(error);
  }
});
//Put
taskRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log("id", id);
  const updatedTask = req.body;

  try {
    const Task = await UpdateWholeTask(id, updatedTask);
    if (Task) {
      res.status(200).json({
        message: "success",
        data: Task,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//Get
taskRouter.get("/", async (req, res) => {
  try {
    const Tasks = await getTask();
    console.log(Tasks);
    if (Tasks) {
      res.status(200).json({
        message: "success",
        data: Tasks,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});
// Delete
taskRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await deleteTask(id);

    if (deletedTask) {
      res.status(200).json({
        message: "success",
        data: deletedTask,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Not found",
    });
  }
});

export default taskRouter;
