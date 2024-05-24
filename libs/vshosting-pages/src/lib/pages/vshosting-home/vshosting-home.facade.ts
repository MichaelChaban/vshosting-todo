import { Injectable, TemplateRef, inject } from "@angular/core";
import {
  Todo,
  TodosService,
  VshostingDialogComponent,
  VshostingDialogData,
} from "@vshosting-todo/shared";
import {
  addTodoAction,
  deleteTodoAction,
  fetchTodosAction,
  updateTodoAction,
} from "../..";
import { Store } from "@ngrx/store";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable()
export class VshostingHomeFacade {
  private readonly todoService = inject(TodosService);
  private readonly snackbar = inject(MatSnackBar);
  private readonly dialogService = inject(MatDialog);
  private readonly store = inject(Store);

  template: TemplateRef<any> | undefined;
  formGroup!: FormGroup;

  init() {
    this.createFormGroup();
    this.loadTodos();
  }

  initTemplate(template: TemplateRef<any>) {
    this.template = template;
  }

  loadTodos() {
    this.store.dispatch(fetchTodosAction());
  }

  createTodo() {
    this.resetFormGroup();
    const dialogData: VshostingDialogData = {
      title: "Create todo",
      onConfirm: () => this.saveTodo(undefined, true),
    };
    this.openEditDialog(dialogData);
  }

  editTodo(data: Todo) {
    this.resetFormGroup();
    const dialogData: VshostingDialogData = {
      title: "Edit todo",
      onConfirm: () => this.saveTodo(data.id),
    };
    this.formGroup.patchValue({ ...data });
    this.openEditDialog(dialogData);
  }

  deleteTodo(data: Todo) {
    this.openDeleteDialog(data);
  }

  private openEditDialog(data: VshostingDialogData): void {
    this.dialogService.open(VshostingDialogComponent, {
      width: "400px",
      data: {
        ...data,
        confirmText: "Save",
        template: this.template,
        onCancel: () => this.formGroup.reset(),
      },
    });
  }

  private openDeleteDialog(data: Todo): void {
    this.dialogService.open(VshostingDialogComponent, {
      width: "400px",
      data: {
        title: "Delete todo",
        message: "Are you sure you want to delete this todo?",
        confirmText: "Delete",
        onConfirm: () => this.confirmDeleteTodo(data),
      } as VshostingDialogData,
    });
  }

  private resetFormGroup() {
    this.formGroup.reset();
    this.formGroup.get("completed")?.setValue(false);
  }

  private createFormGroup() {
    this.formGroup = new FormGroup({
      text: new FormControl(null, Validators.required),
      completed: new FormControl(false),
    });
  }

  private saveTodo(id?: number, isCreate?: boolean) {
    if (isCreate) {
      return this.store.dispatch(addTodoAction({ todo: this.formGroup.value }));
    }
    if (!id) {
      return;
    }
    return this.store.dispatch(
      updateTodoAction({ id: id, todo: this.formGroup.value })
    );
  }

  private confirmDeleteTodo(data: Todo) {
    if (!data.id) {
      return;
    }
    return this.store.dispatch(deleteTodoAction({ id: data.id }));
  }
}
