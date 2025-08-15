export interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
  priority: number;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: string;
  priority?: number;
  dueDate?: Date;
}
