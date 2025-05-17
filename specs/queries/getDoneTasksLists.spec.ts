import { getFinishedTasksLists } from "@/graphql/resolvers/queries/getFinishedTasksLists";

describe("getDoneTasksLists Query", () => {
  it("Should return finished tasks only", async () => {
    const mockToArray = jest
      .fn()
      .mockResolvedValue([{ taskName: "Finished Task", isDone: true }]);
    const mockDb = {
      collection: () => ({
        find: jest.fn().mockReturnValue({ toArray: mockToArray }),
      }),
    };

    const result = await getFinishedTasksLists(
      {},
      { userId: "user123" },
      { db: mockDb }
    );

    expect(result[0].isDone).toBe(true);
  });
});
