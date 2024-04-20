export interface Todo {
    id: string;
    text: string;
    deadline: Date;
    priority: Priority;
    completed: boolean;
  }
  
  export enum Priority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
  }
  