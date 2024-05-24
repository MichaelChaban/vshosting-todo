import { ActionReducerMap } from "@ngrx/store";
import { TodoEffects, TodoState, todoReducer } from "./todo";

export * from "./todo";

export interface AppState {
  todo: TodoState;
}

export const reducers: ActionReducerMap<AppState> = {
  todo: todoReducer,
};

export const effects = [TodoEffects];
