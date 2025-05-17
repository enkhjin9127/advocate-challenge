export const getAllTasks = async (_: any, { userId }: { userId: string }, { db }: any) => {
  return await db.collection("tasks").find({ userId }).toArray();
};
