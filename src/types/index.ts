export interface Task {
  taskId: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  priority: "high" | "medium" | "low" | "urgent";
  category:
    | "personal"
    | "work"
    | "other"
    | "social"
    | "health"
    | "finance"
    | "learning";
}

export type TaskProps = {
  task: Task;
};
export type TaskPropsChildren = {
  tasks: Task[];
  heading?: string;
  show?: boolean;
};

export interface Credential {
  username: string;
  password: string;
}

export type AuthState = {
  accessToken: string | "";
  isLoading: boolean;
  login: (credentials: Credential) => Promise<number | true>;
  logout: () => void;
  register: (credentials: Credential) => Promise<number | true>;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

export type TasksResponse = Task[];

export type DeleteTaskParams = { id: string };

export interface ApiResponse {
  success: boolean | string;
  message?: string;
}
export type UpdateTaskParams = Task;

export interface CountObject {
  allCount: number;
  upCount: number;
  todayCount: number;
  todayCompleted: number;
  completedCount: number;
  personal: CategoryCounter;
  work: CategoryCounter;
  health: CategoryCounter;
  finance: CategoryCounter;
  learning: CategoryCounter;
  social: CategoryCounter;

  other: CategoryCounter;

  months: number[];
}
type CategoryCounter = {
  count: number;
  completed: number;
  urgent: number;
  high: number;
  medium: number;
  low: number;
};
