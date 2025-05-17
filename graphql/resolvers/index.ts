import { getFinishedTasksLists } from "./queries/getFinishedTasksLists";
import { getAllTasks } from "./queries/getAllTasks";
import { updateTask } from "./mutations/updateTask";
import { addTask } from "./mutations/addTask";

export const resolvers = {
  Query: {
    getAllTasks,
    getFinishedTasksLists,
  },
  Mutation: {
    addTask,
    updateTask,
  },
};
