import { updateTask } from "@/graphql/resolvers/mutations/updateTask";
import { ObjectId } from "mongodb";

describe("updateTask Mutation", () => {
  it("Should update an existing task", async () => {
    const validTaskId = new ObjectId().toString();

    const db = {
      collection: jest.fn(() => ({
        findOne: jest.fn(() => Promise.resolve({
          _id: new ObjectId(validTaskId),
          userId: "user123",
          taskName: "Old Task",
          priority: 3,
          isDone: false,
          description: "Old description",
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        updateOne: jest.fn(() => Promise.resolve({ modifiedCount: 1 })),
      })),
    };

    const input = {
      userId: "user123",
      taskName: "Updated Task",
      description: "Updated detailed description",
      priority: 4,
      isDone: true,
      tags: ["tag1", "tag2"],
    };

    const result = await updateTask(null, { taskId: validTaskId, input }, { db });

    expect(result.taskName).toBe("Updated Task");
    expect(result.isDone).toBe(true);
  });
});
