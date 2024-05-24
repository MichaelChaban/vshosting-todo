// src/app/store/selectors/todo.selectors.ts
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as todos from "./todo.reducer";
import { TODO_FEATURE_KEY } from "./todo.reducer";

export const selectTodoState = createFeatureSelector<todos.TodoState>(
  TODO_FEATURE_KEY
);

export const selectAllTodos = createSelector(selectTodoState, todos.selectAll);

export const selectCompletedTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((todo) => todo.completed)
);
export const selectCompletedTodosCount = createSelector(
  selectAllTodos,
  (todos) => todos.filter((todo) => todo.completed)?.length
);

export const selectUncompletedTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((todo) => !todo.completed)
);

export const selectUncompletedTodosCount = createSelector(
  selectAllTodos,
  (todos) => todos.filter((todo) => !todo.completed)?.length
);
