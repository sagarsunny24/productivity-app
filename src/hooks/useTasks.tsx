import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQueryClient, useMutation, useQuery, } from "@tanstack/react-query";
import type { Task,UpdateTaskParams,DeleteTaskParams,ApiResponse,TasksResponse } from "../types";
import { api } from "../axios/api";

export default function useTasks() {
  const auth = useContext(AuthContext);
  const token = auth?.accessToken;
  const queryClient = useQueryClient();
  async function onFetch() {
    console.log("Inside Fetching", token);
    const res = await api.get<TasksResponse>("/api/tasks/show");
    return res.data ?? [];
  }

  const { data: tasks,fetchStatus } = useQuery<TasksResponse>({
    queryKey: ["tasks"],
    queryFn: onFetch,
    refetchOnWindowFocus:false,
  });

  const { mutateAsync: onAdd } = useMutation<ApiResponse, Error, Task>({
    mutationFn: async (newTask) => {
      console.log("Inside adding", token);
      const res = await api.post<ApiResponse>("/api/tasks/add", newTask);
      return  res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutateAsync: onEdit } = useMutation<Task,Error,UpdateTaskParams>({
    mutationFn: async (updateTask) => {
      console.log(updateTask);
      const res = await api.put<Task>("/api/tasks/update",updateTask);
      return res.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  //remove once tasks is complete

  const {mutateAsync:onDelete} = useMutation<ApiResponse,Error,DeleteTaskParams>({
    mutationFn: async({id}) =>{
      const res = await api.delete<ApiResponse>(`api/tasks/remove/${id}`)
      return res.data
    },
    onSuccess:()=>queryClient.invalidateQueries({queryKey:["tasks"]})
  })

  const {mutateAsync:onToggle} = useMutation<ApiResponse,Error,Pick<Task, "taskId" | "completed" >,{previousTasks : Task[] | undefined}>({
    mutationFn:async({taskId,completed}) =>{
      const res = await api.patch<ApiResponse>(`api/tasks/mark/${taskId}`,{completed,})
      return res.data
    },
    onMutate:async({taskId,completed})=>{
      await queryClient.cancelQueries({queryKey: ["tasks"]})
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"])
      
      
      queryClient.setQueryData(["tasks"],(oldData : Task[])=>{
      if(!oldData) return oldData;
      return oldData.map((task:Task)=> task.taskId===taskId ? {...task,completed}: task)
    })
  return {previousTasks}
},
   onError: (_err, _vars, context) => {
    queryClient.setQueryData(["tasks"], context?.previousTasks);
  },

    // onSuccess:()=>queryClient.invalidateQueries({queryKey:["tasks"]})
  })
  return { tasks, onAdd, onEdit,fetchStatus ,onDelete,onToggle};
}

