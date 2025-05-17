import { gql } from "apollo-server-cloud-functions";

export const typeDefs = gql`
  input TaskInput {
    taskName: String!
    description: String!
    priority: Int!
    tags: [String]
    userId: String!
  }

  input UpdateTaskInput {
    taskName: String
    description: String
    priority: Int
    isDone: Boolean
    tags: [String]
    userId: String!
  }

  type Task {
    _id: ID!
    taskName: String!
    description: String!
    isDone: Boolean!
    priority: Int!
    tags: [String]
    createdAt: String
    updatedAt: String
    userId: String!
  }

  type Query {
    getFinishedTasksLists(userId: String!): [Task!]!
    getAllTasks(userId: String!): [Task!]!
  }

  type Mutation {
    addTask(input: TaskInput!): Task!
    updateTask(taskId: ID!, input: UpdateTaskInput!): Task!
  }
`;
