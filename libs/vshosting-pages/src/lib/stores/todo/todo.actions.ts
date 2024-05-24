import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Todo } from "@vshosting-todo/shared";

export const fetchTodosAction = createAction("[Todo] Fetch Todos");
export const fetchTodosSuccessAction = createAction(
  "[Todo] Fetch Todos Success",
  props<{ todos: Todo[] }>()
);
export const fetchTodosFailureAction = createAction(
  "[Todo] Fetch Todos Failure",
  props<{ todos: Todo[] }>()
);

export const addTodoAction = createAction(
  "[Todo] Add Todo",
  props<{ todo: Todo }>()
);
export const addTodoSuccessAction = createAction(
  "[Todo] Add Todo Success",
  props<{ todo: Todo }>()
);
export const addTodoFailureAction = createAction(
  "[Todo] Add Todo Failure",
  props<{ todo: Todo }>()
);

export const updateTodoAction = createAction(
  "[Todo] Update Todo",
  props<{ id: string; todo: Todo }>()
);
export const updateTodoSuccessAction = createAction(
  "[Todo] Update Todo Success",
  props<{ update: Update<Todo> }>()
);
export const updateTodoFailureAction = createAction(
  "[Todo] Update Todo Failure",
  props<{ update: Update<Todo> }>()
);

export const deleteTodoAction = createAction(
  "[Todo] Delete Todo",
  props<{ id: string }>()
);
export const deleteTodoSuccessAction = createAction(
  "[Todo] Delete Todo Success",
  props<{ id: string }>()
);
export const deleteTodoFailureAction = createAction(
  "[Todo] Delete Todo Failure",
  props<{ id: string }>()
);

export const markAllAsCompletedAction = createAction(
  "[Todo] Mark All As Completed"
);
export const markAllAsCompletedSuccessAction = createAction(
  "[Todo] Mark All As Completed Success"
);
export const markAllAsCompletedFailureAction = createAction(
  "[Todo] Mark All As Completed Failure"
);
