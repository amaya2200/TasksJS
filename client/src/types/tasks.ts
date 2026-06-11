export interface task {
  _id: string;
  title: string;
  completed: boolean;
  isOptimistic?: boolean;
} 

export interface taskList {
  _id: string;
  name: string;
  tasks: task[];
}