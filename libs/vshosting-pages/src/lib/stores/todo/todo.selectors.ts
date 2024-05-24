// src/app/store/selectors/todo.selectors.ts
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as todos from "./todo.reducer";
import { TODO_FEATURE_KEY } from "./todo.reducer";

export const selectTodoState = createFeatureSelector<todos.TodoState>(
  TODO_FEATURE_KEY
);

export const selectTodoIds = createSelector(
  selectTodoState,
  todos.selectIds
);
export const selectTodoEntities = createSelector(
  selectTodoState,
  todos.selectEntities
);
export const selectAllTodos = createSelector(
  selectTodoState,
  todos.selectAll
);
export const selectTodoTotal = createSelector(
  selectTodoState,
  todos.selectTotal
);
export const selectCurrentTodoId = createSelector(
  selectTodoState,
  (state) => state.selectedTodoId
);
export const selectCurrentTodo = createSelector(
  selectTodoEntities,
  selectCurrentTodoId,
  (todoEntities, todoId) => (todoId ? todoEntities[todoId] : null)
);
