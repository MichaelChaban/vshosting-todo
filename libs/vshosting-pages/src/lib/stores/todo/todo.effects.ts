import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import * as TodoActions from "./todo.actions";
import { TodosService } from "@vshosting-todo/shared";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class TodoEffects {
  private readonly actions$ = inject(Actions);
  private readonly todoService = inject(TodosService);
  private readonly snackbar = inject(MatSnackBar);

  fetchTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.fetchTodosAction),
      mergeMap(() =>
        this.todoService.fetchList().pipe(
          map((todos) => TodoActions.fetchTodosSuccessAction({ todos })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodoAction),
      mergeMap((action) =>
        this.todoService.create(action.todo).pipe(
          map((todo) => {
            this.snackbar.open("Todo was created", "Close", {
              duration: 2000,
            });
            return TodoActions.addTodoSuccessAction({ todo });
          }),
          catchError(() => {
            this.snackbar.open("Todo was not created", "Close", {
              duration: 2000,
            });
            return EMPTY;
          })
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodoAction),
      mergeMap(({ id, todo }) =>
        this.todoService.update(id, todo).pipe(
          map((updatedTodo) => {
            this.snackbar.open(`Todo #${todo.id} was updated`, "Close", {
              duration: 2000,
            });
            return TodoActions.updateTodoSuccessAction({
              update: { id: updatedTodo.id!, changes: updatedTodo },
            });
          }),
          catchError(() => {
            this.snackbar.open(`Todo #${todo.id} was not updated`, "Close", {
              duration: 2000,
            });
            return EMPTY;
          })
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodoAction),
      mergeMap(({ id }) =>
        this.todoService.delete(id).pipe(
          map(() => {
            this.snackbar.open(`Todo #${id} was deleted`, "Close", {
              duration: 2000,
            });
            return TodoActions.deleteTodoSuccessAction({ id: id });
          }),
          catchError(() => {
            this.snackbar.open(`Todo #${id} was not deleted`, "Close", {
              duration: 2000,
            });
            return EMPTY;
          })
        )
      )
    )
  );
}
