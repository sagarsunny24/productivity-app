export interface Task {
taskId: string,
title:string,
desc?:string,
dueDate:string,
completed: boolean,
priority: 'high' | 'medium' |'low'
category: "personal" | "work" | "other"
}

export type TaskProps = {
  task: Task
}

export interface Credential {
  username: string,
  password: string
}

export type AuthState = {
  accessToken: string | "",
  login: (credentials:Credential)=> Promise<number| true>,
  logout: ()=>void,
  register: (credentials:Credential)=> Promise<number | true>,
}

