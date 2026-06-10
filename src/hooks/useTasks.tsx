import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { type Task } from "../types";

export default function useTasks() {
  const token = useContext(AuthContext);
  
  async function onFetch() {
    console.log("Inside Fetching",token)
    const res = await fetch("http://localhost:3000/api/tasks/show", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Cannot fetch");
    } else {
      return res.json();
    }
  }

  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: onFetch,
  });

  const { mutate: onAdd } = useMutation<Task,Error,Task>({
    mutationFn: async (newTask) => {
      console.log("Inside adding",token)
      const res = await fetch("http://localhost:3000/api/tasks/add", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (!res.ok) {
        throw new Error("Adding task failed");
      }

      return res.json();
    },
  });

  //remove once tasks is complete

  return { tasks, onAdd };
}
