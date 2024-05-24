import { createEntityAdapter, EntityState, EntityAdapter } from "@ngrx/entity";
import { createReducer, on, Action } from "@ngrx/store";
import * as TodoActions from "./todo.actions";
import { Todo } from "@vshosting-todo/shared";

export const TODO_FEATURE_KEY = "todo";

export interface TodoState extends EntityState<Todo> {
  selectedTodoId: string | null;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: TodoState = adapter.getInitialState({
  selectedTodoId: null,
});

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodoSuccessAction, (state, { todo }) =>
    adapter.addOne(todo, state)
  ),
  on(TodoActions.updateTodoSuccessAction, (state, { update }) =>
    adapter.updateOne(update, state)
  ),
  on(TodoActions.deleteTodoSuccessAction, (state, { id }) =>
    adapter.removeOne(id, state)
  ),
  on(TodoActions.fetchTodosSuccessAction, (state, { todos }) =>
    adapter.setAll(todos, state)
  ),
  on(TodoActions.markAllAsCompletedSuccessAction, (state) => {
    const updatedTodos = state.ids.map((id) => {
      const todo = state.entities[id];
      return { ...todo, completed: true } as Todo;
    });
    return adapter.setAll(updatedTodos, state);
  })
);

export function reducer(state: TodoState | undefined, action: Action) {
  return todoReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
