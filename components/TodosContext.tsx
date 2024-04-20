import React, { createContext, useState, useContext } from 'react';
import { Todo, Priority } from '../assets/types'; 

interface TodosContextState {
  todos: Todo[];
  addTodo: (text: string, deadline: Date, priority: Priority) => void;
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
}

const defaultContextValue: TodosContextState = {
  todos: [],
  addTodo: () => {}, 
  deleteTodo: () => {},
  toggleComplete: () => {}
};

export const TodosContext = createContext<TodosContextState>(defaultContextValue);

export const useTodos = () => useContext(TodosContext);
