export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  priority?: number;
  // Add other fields based on Tasks.org schema
} 