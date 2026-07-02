export const typeDefs = `
type Task {
  taskId: ID!
  title: String!
  description :String
  dueDate: String
  completed:Boolean!
  priority: String
  category: String
}
input TaskFilter {
  completed: Boolean
  priority: String
  category: String
}

type Query {
  tasks(filter: TaskFilter): [Task]
}

input AddTaskInput {
 taskId: ID!
  title: String!
  description :String
  dueDate: String
  completed:Boolean!
  priority: String
  category: String
}
input UpdateTaskInput {
  taskId: ID!
  title: String
  description: String
  dueDate: String
  completed: Boolean
  priority: String
  category: String
}

type Mutation {
 addTask(input:AddTaskInput!): Task
 removeTask(id:ID!) : Task
 updateTask(update:UpdateTaskInput!): Task
 toggleTask(id:ID!, completed: Boolean!) : Task
}
`;
