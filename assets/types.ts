export interface Todo {
    id: string;
    text: string;
    deadline: string;
    priority: Priority;
  }
  
  export enum Priority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
  }
  