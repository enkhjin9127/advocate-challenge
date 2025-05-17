import { getAllTasks } from "@/graphql/resolvers/queries/getAllTasks";

describe("getAllTasks Query", () => {
  it("Should fetch all tasks for a user", async () => {
    const mockToArray = jest.fn().mockResolvedValue([
      { taskName: "Task 1" },
      { taskName: "Task 2" },
    ]);
    const mockDb = {
      collection: () => ({
        find: jest.fn().mockReturnValue({ toArray: mockToArray }),
      }),
    };

    const result = await getAllTasks({}, { userId: "user123" }, { db: mockDb });

    expect(result.length).toBe(2);
    expect(result[0].taskName).toBe("Task 1");
  });
});
