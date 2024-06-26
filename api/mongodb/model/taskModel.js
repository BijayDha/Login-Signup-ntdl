import Task from "../schema/taskSchema.js";

// Create a task in DB
export const createTask = async (taskObj) => {
  const task = await Task.create(taskObj);
  return task;
};

// Fetch or read the task
export const getTask = async () => {
  const taskList = await Task.find();
  return taskList;
};
// delete the task
export const deleteTask = async (task_id) => {
  const deleteTask = await Task.findByIdAndDelete(task_id, {
    new: true,
  });
  return deleteTask;
};

export const UpdateTask = async (id, updatedField) => {
  const updateTask = await Task.findByIdAndUpdate(id, updatedField, {
    new: true,
  });

  return updateTask;
};

export const UpdateWholeTask = async (id, updatedTask) => {
  console.log(updatedTask, "in model");
  const updateTask = await Task.findByIdAndUpdate(id, updatedTask, {
    new: true,
  });

  return updateTask;
};
