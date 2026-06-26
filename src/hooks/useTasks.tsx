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
    const res = await api.post<TasksResponse>("/graphql",{
      query: `query {tasks {
       taskId
    title
    description
    dueDate
    completed
    priority
    category}}`
    });
    console.log(res)
    return res.data.data.tasks ?? [];
  }

  const { data, fetchStatus } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: onFetch,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: onAdd } = useMutation<Task, Error, Task>({
    mutationFn: async (newTask) => {
      console.log("Inside adding", token);
      const res = await api.post<Task>("/graphql", {
          query: 
          `mutation AddTask($input:AddTaskInput!){
          addTask(input: $input){
          title taskId completed}}`,
        variables :{
          input:newTask
        }});
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutateAsync: onEdit } = useMutation<Task, Error, UpdateTaskParams>({
    mutationFn: async (updateTask) => {
      console.log(updateTask);
      const res = await api.post<Task>("/graphql",{
        query: `mutation UpdateTask($update:UpdateTaskInput! ){
        updateTask(update: $update){
        title taskId completed}}`,
        variables:{
          update:updateTask
        }
      });
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
      const res = await api.post<ApiResponse>(`/graphql`,{
        query:`mutation RemoveTask($id:ID!){
        removeTask(id:$id){
         title taskId completed}}`,
         variables:{
          id:id
         }
      });
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
      const res = await api.post<ApiResponse>(`/graphql`, {
        query:`mutation ToggleTask($id: ID!,$completed:Boolean!){
        toggleTask(id:$id,completed:$completed){
        taskId completed}}`,
        variables:{
          id:taskId,
          completed:completed
        }
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

  function calculateCount(data:Task[]){
  const counts :CountObject = (data ?? []).reduce(
    (acc,t) =>{
      const due = parseISO(t.dueDate)
      const monthIndex = due.getMonth()
      acc.months[monthIndex]  += 1
      acc.allCount +=1
      if(t.completed) acc.completedCount+=1
      if(t.category === 'personal'){
        acc.personal.count +=1
        if(t.completed === true) acc.personal.completed +=1
         if(t.priority === 'urgent') acc.personal.urgent+=1
        if(t.priority === 'high') acc.personal.high +=1
        if(t.priority === 'medium') acc.personal.medium +=1
        if(t.priority === 'low') acc.personal.low +=1
      } 
    
       if(t.category === 'work') {
        acc.work.count +=1
        if(t.completed === true) acc.work.completed +=1
         if(t.priority === 'urgent') acc.work.urgent +=1
        if(t.priority === 'high') acc.work.high +=1
        if(t.priority === 'medium') acc.work.medium +=1
        if(t.priority === 'low') acc.work.low +=1
       }
       if(t.category === 'other') {
        acc.other.count +=1
        if(t.completed ===true) acc.other.completed +=1
          if(t.priority === 'urgent') acc.other.urgent +=1
        if(t.priority === 'high') acc.other.high +=1
        if(t.priority === 'medium') acc.other.medium +=1
        if(t.priority === 'low') acc.other.low +=1
               }
                if(t.category === 'social') {
        acc.social.count +=1
        if(t.completed ===true) acc.social.completed +=1
        if(t.priority === 'urgent') acc.social.urgent +=1
        if(t.priority === 'high') acc.social.high +=1
        if(t.priority === 'medium') acc.social.medium +=1
        if(t.priority === 'low') acc.social.low +=1
               }
                if(t.category === 'learning') {
        acc.learning.count +=1
        if(t.completed ===true) acc.learning.completed +=1
        if(t.priority === 'urgent') acc.learning.urgent +=1
        if(t.priority === 'high') acc.learning.high +=1
        if(t.priority === 'medium') acc.learning.medium +=1
        if(t.priority === 'low') acc.learning.low +=1
               }
                if(t.category === 'finance') {
        acc.finance.count +=1
        if(t.completed ===true) acc.finance.completed +=1
        if(t.priority === 'urgent') acc.finance.urgent +=1
        if(t.priority === 'high') acc.finance.high +=1
        if(t.priority === 'medium') acc.finance.medium +=1
        if(t.priority === 'low') acc.finance.low +=1
               }
                if(t.category === 'health') {
        acc.health.count +=1
        if(t.completed ===true) acc.health.completed +=1
        if(t.priority === 'urgent') acc.health.urgent +=1
        if(t.priority === 'high') acc.health.high +=1
        if(t.priority === 'medium') acc.health.medium +=1
        if(t.priority === 'low') acc.health.low +=1
               }
       if(isToday(due)) {
        acc.todayCount +=1
        if(t.completed === true) acc.todayCompleted +=1
      }
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
    todayCompleted: 0,
    completedCount:0,
   personal:{
   count:0,
      completed:0,
      urgent:0,
      high:0,
      medium:0,
      low:0
   },
    
    work:{
      count:0,
      completed:0,
      urgent:0,
      high:0,
      medium:0,
      low:0
     
    },
    other:{
      count:0,
      completed:0,
      urgent:0,
      high:0,
      medium:0,
      low:0
    },
    social:{
      count:0,
      completed:0,
      urgent:0,
      high:0,
      medium:0,
      low:0
    },
    health:{
count:0,
      completed:0,
      urgent:0,
      high:0,
      medium:0,
      low:0
    },
    finance:{
      count:0,
      completed:0,
      urgent:0,
      high:0,
      medium:0,
      low:0
    },
    learning:{
 count:0,
      completed:0,
      urgent:0,
      high:0,
      medium:0,
      low:0
    },
   
   
   
    months: Array(12).fill(0)
    }
  )
  return counts 
  }

const counts = calculateCount(data ?? [])

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
    calculateCount
  };
}
