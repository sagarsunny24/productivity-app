export interface Task {
userId: string,
taskId: string,
title:string,
description?:string,
dueDate:string,
completed: boolean,
priority: 'high' | 'medium' |'low' | 'urgent'
category: "personal" | "work" | "other" |'social'| 'learning'| 'media' | 'finance'
}
export interface Credential {
  userId: string,
  username: string,
  password: string,
  refreshToken?:string
}

export interface LoginCredential {
  userid: string,
  password_hash: string
}

export interface UserBody{
  user: string,
  pwd: string
}
declare global {
  namespace Express {
    interface Request {
      userId?: string;
       secret?: string | undefined;
        /** Parsed cookies that have not been signed */
        cookies: Record<string, any>;
        /** Parsed cookies that have been signed */
        signedCookies: Record<string, any>;
    }
  }
}

export {};
export interface AppError {
message:string,
status?: number,
code?: string
}
