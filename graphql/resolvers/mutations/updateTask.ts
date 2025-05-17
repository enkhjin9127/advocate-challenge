import { ObjectId } from "mongodb";

export const updateTask = async (_: any, { taskId, input }: { taskId: string; input: any }, { db }: any) => {
  if (!ObjectId.isValid(taskId)) throw new Error("Invalid taskId format.");

  const task = await db.collection("tasks").findOne({ _id: new ObjectId(taskId) });
  if (!task) throw new Error("Task not found.");
  if (input.userId !== task.userId) throw new Error("Unauthorized to update this task.");
  if (input.priority && (input.priority < 1 || input.priority > 5)) {
    throw new Error("Priority must be between 1 and 5.");
  }

  input.updatedAt = new Date();
  delete input.userId;

  await db.collection("tasks").updateOne(
    { _id: new ObjectId(taskId) },
    { $set: input }
  );

  return { ...task, ...input };
};
