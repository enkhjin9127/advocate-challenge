import { addTask } from "@/graphql/resolvers/mutations/addTask";

describe("addTask Mutation", () => {
  it("Should create a new task successfully", async () => {
    const mockInsertOne = jest.fn().mockResolvedValue({ insertedId: "abc123" });
    const mockFindOne = jest.fn().mockResolvedValue(null);
    const mockDb = {
      collection: () => ({
        findOne: mockFindOne,
        insertOne: mockInsertOne,
      }),
    };

    const input = {
      taskName: "New Task",
      description: "This is a valid task description.",
      priority: 3,
      userId: "user123",
      tags: ["work", "urgent"],
    };

    const result = await addTask({}, { input }, { db: mockDb });

    expect(mockFindOne).toHaveBeenCalledWith({ taskName: "New Task", userId: "user123" });
    expect(mockInsertOne).toHaveBeenCalled();
    expect(result).toMatchObject({
      taskName: input.taskName,
      description: input.description,
      priority: input.priority,
      userId: input.userId,
      tags: ["work", "urgent"],
    });
  });
});
