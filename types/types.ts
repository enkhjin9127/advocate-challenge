export interface Task {
  _id?: string;
  taskName: string;
  description: string;
  isDone: boolean;
  priority: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
