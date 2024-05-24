import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import * as TodoActions from "./todo.actions";
import { TodosService, VshostingSnackbarService } from "@vshosting-todo/shared";

@Injectable()
export class TodoEffects {
  private readonly actions$ = inject(Actions);
  private readonly todoService = inject(TodosService);
  private readonly snackbar = inject(VshostingSnackbarService);

  fetchTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.fetchTodosAction),
      mergeMap(() =>
        this.todoService.fetchList().pipe(
          map((todos) => TodoActions.fetchTodosSuccessAction({ todos })),
          catchError(() => {
            this.snackbar.error("Todos were not fetched");
            return EMPTY;
          })
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
            this.snackbar.success("Todo was created");
            return TodoActions.addTodoSuccessAction({ todo });
          }),
          catchError(() => {
            this.snackbar.error("Todo was not created");
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
            this.snackbar.success(`Todo #${id} was updated`);
            return TodoActions.updateTodoSuccessAction({
              update: { id: updatedTodo.id!, changes: updatedTodo },
            });
          }),
          catchError(() => {
            this.snackbar.error(`Todo #${todo.id} was not updated`);
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
            this.snackbar.success(`Todo #${id} was deleted`);
            return TodoActions.deleteTodoSuccessAction({ id: id });
          }),
          catchError(() => {
            this.snackbar.error(`Todo #${id} was not deleted`);
            return EMPTY;
          })
        )
      )
    )
  );

  markAllAsCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.markAllAsCompletedAction),
      mergeMap(() =>
        this.todoService.markAllAsCompleted().pipe(
          map(() => {
            this.snackbar.success("All todos were marked as completed");
            return TodoActions.markAllAsCompletedSuccessAction();
          }),
          catchError(() => {
            this.snackbar.error("All todos were not marked as completed");
            return EMPTY;
          })
        )
      )
    )
  );
}
