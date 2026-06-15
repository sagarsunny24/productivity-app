import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import type {
  Task,
  UpdateTaskParams,
  DeleteTaskParams,
  ApiResponse,
  TasksResponse,
  CountObject,

} from "../types";
import { api } from "../axios/api";
import {
  isWithinInterval,
  startOfMonth,
  endOfMonth,
  parseISO,
  isToday,
} from "date-fns";

export default function useTasks() {
  const auth = useContext(AuthContext);
  const token = auth?.accessToken;
  const queryClient = useQueryClient();
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const searchQuery = auth?.searchQuery;
  async function onFetch() {
    console.log("Inside Fetching", token);
    const res = await api.get<TasksResponse>("/api/tasks/show");

    return res.data ?? [];
  }

  const { data, fetchStatus } = useQuery<TasksResponse>({
    queryKey: ["tasks"],
    queryFn: onFetch,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: onAdd } = useMutation<ApiResponse, Error, Task>({
    mutationFn: async (newTask) => {
      console.log("Inside adding", token);
      const res = await api.post<ApiResponse>("/api/tasks/add", newTask);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutateAsync: onEdit } = useMutation<Task, Error, UpdateTaskParams>({
    mutationFn: async (updateTask) => {
      console.log(updateTask);
      const res = await api.put<Task>("/api/tasks/update", updateTask);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  //remove once tasks is complete

  const { mutateAsync: onDelete } = useMutation<
    ApiResponse,
    Error,
    DeleteTaskParams
  >({
    mutationFn: async ({ id }) => {
      const res = await api.delete<ApiResponse>(`api/tasks/remove/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const { mutateAsync: onToggle } = useMutation<
    ApiResponse,
    Error,
    Pick<Task, "taskId" | "completed">,
    { previousTasks: Task[] | undefined }
  >({
    mutationFn: async ({ taskId, completed }) => {
      const res = await api.patch<ApiResponse>(`api/tasks/mark/${taskId}`, {
        completed,
      });
      return res.data;
    },
    onMutate: async ({ taskId, completed }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData(["tasks"], (oldData: Task[]) => {
        if (!oldData) return oldData;
        return oldData.map((task: Task) =>
          task.taskId === taskId ? { ...task, completed } : task,
        );
      });
      return { previousTasks };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },

    // onSuccess:()=>queryClient.invalidateQueries({queryKey:["tasks"]})
  });
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery ?? ""), 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredTasks = useMemo(
    () =>
      data?.filter((t) =>
        t.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
      ) ?? [],
    [data, debouncedQuery],
  );
  const isSearching = searchQuery !== debouncedQuery;

  // const thisMonthTasks = data?.filter((t) => {
  //   // 2026-06-24
  //   return isWithinInterval(new Date(parseISO(t.dueDate)), {
  //     start: startOfMonth(new Date()),
  //     end: endOfMonth(new Date()),
  //   });
  // });
  // const todayTasks = data?.filter((t) => isToday(parseISO(t.dueDate)));
  // const completedTasks = data?.filter((t) => t.completed);
  // const perTasks = data?.filter((t) => t.category === "personal");
  // const workTasks = data?.filter((t) => t.category === "work");
  // const otherTasks = data?.filter((t) => t.category === "other");
  // const counts: CountObject = {
  //   allCount: data?.length ?? 0,
  //   upCount: thisMonthTasks?.length ?? 0,
  //   todayCount: todayTasks?.length ?? 0,
  //   completedCount: completedTasks?.length ?? 0,
  //   perCount: perTasks?.length ?? 0,
  //   workCount: workTasks?.length ?? 0,
  //   otherCount: otherTasks?.length ?? 0,
  // };

  const counts :CountObject = (data ?? []).reduce(
    (acc,t) =>{
      const due = parseISO(t.dueDate)
      acc.allCount +=1
      if(t.completed) acc.completedCount+=1
      if(t.category === 'personal') acc.perCount +=1
       if(t.category === 'work') acc.workCount +=1
       if(t.category === 'other') acc.otherCount +=1
       if(isToday(due)) acc.todayCount +=1
       if(isWithinInterval(new Date(parseISO(t.dueDate)), {
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date()),
    })) acc.upCount +=1
    return acc
  },
    {
     allCount: 0,
    upCount: 0,
    todayCount: 0,
    completedCount:0,
    perCount: 0,
    workCount: 0,
    otherCount: 0,
    }
  ) 


  const tasks = filteredTasks;

  return {
    tasks,
    onAdd,
    onEdit,
    fetchStatus,
    isSearching,
    onDelete,
    onToggle,
    counts,
  };
}
