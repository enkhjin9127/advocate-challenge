export const addTask = async (
  _: any,
  { input }: { input: any },
  { db }: any
) => {
  const { taskName, description, priority, userId, tags } = input;

  if (description.length < 10 || description === taskName) {
    throw new Error("Invalid description.");
  }

  if (priority < 1 || priority > 5) {
    throw new Error("Priority must be between 1 and 5.");
  }

  if (tags && tags.length > 5) {
    throw new Error("You can only have up to 5 tags per task.");
  }

  const existing = await db.collection("tasks").findOne({ taskName, userId });
  if (existing) {
    throw new Error("Task with this name already exists for the user.");
  }

  const newTask = {
    taskName,
    description,
    isDone: false,
    priority,
    tags: tags || [],
    createdAt: new Date(),
    updatedAt: new Date(),
    userId,
  };

  const result = await db.collection("tasks").insertOne(newTask);
  return { ...newTask, _id: result.insertedId.toString() };
};
