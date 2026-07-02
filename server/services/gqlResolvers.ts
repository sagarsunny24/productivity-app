import {
  addTask,
  showTasks,
  removeTask,
  updateTask,
  toggleTask,
} from "../models/tasksModel.js";
import type { Task } from "../types/types.js";
import { getOrSetCache, deleteCache } from "./redisQuery.js";

type Context = {
  userId: string;
};
interface Args {
  input?: Omit<Task, "userId">;
  update?: Omit<Task,"userId">
}

export const resolvers = {
  Query: {
    tasks: async (_parent: unknown, _args: unknown, context: Context) => {
      const userId = context.userId;
      const userTasks: Task[] | null = await getOrSetCache(
        "tasks:",
        userId,
        showTasks,
      );
      return userTasks;
    },
  },
  Mutation: {
    addTask: async (_parents: unknown, args: Args, context: Context) => {
      const userId = context.userId;
      const newTask = args.input;
      const duplicheck = await addTask({ userId, ...newTask } as Task);
      await deleteCache("tasks:", userId);
      return duplicheck;
    },
    removeTask: async (
      _parents: unknown,
      args: { id: string },
      context: Context,
    ) => {
      const userId = context.userId;
      const id = args.id;
      if (!id) throw new Error("Task id is required");
      const removedTask = await removeTask(userId, id);
      await deleteCache("tasks:", userId);
      return removedTask;
    },
    updateTask: async (_parents: unknown, args: Args, context: Context) => {
      const userId = context.userId;
      const upTask = args.update;
      const updatedTask = await updateTask({ userId, ...upTask } as Task);
      await deleteCache("tasks:", userId);
      return updatedTask;
    },
    toggleTask: async (
      _parents: unknown,
      args: { id: string; completed: boolean },
      context: Context,
    ) => {
      const userId = context.userId;
      const id = args.id;
      const status = args.completed;
      if (!id) throw new Error("Task id is required");
      const toggledTask = await toggleTask(userId, id, status);
      await deleteCache("tasks:", userId);
      return toggledTask;
    },
  },
};
