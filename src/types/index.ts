export interface Task {
taskId: string,
title:string,
description?:string,
dueDate:string,
completed: boolean,
priority: 'high' | 'medium' |'low'
category: "personal" | "work" | "other"
}

export type TaskProps = {
  task: Task
}
export type TaskPropsChildren ={
  tasks: Task[],
  heading?:string
}

export interface Credential {
  username: string,
  password: string
}

export type AuthState = {
  accessToken: string | "",
  isLoading: boolean,
  login: (credentials:Credential)=> Promise<number| true>,
  logout: ()=>void,
  register: (credentials:Credential)=> Promise<number | true>,
}

export type TasksResponse = Task[]

export type DeleteTaskParams = {id:string};

export interface ApiResponse {
  success: boolean | string,
  message?: string
}
export type UpdateTaskParams = Task

