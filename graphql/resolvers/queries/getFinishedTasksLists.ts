export const getFinishedTasksLists = async (
  _: any,
  { userId }: { userId: string },
  { db }: any
) => {
  return await db.collection("tasks").find({ userId, isDone: true }).toArray();
};
