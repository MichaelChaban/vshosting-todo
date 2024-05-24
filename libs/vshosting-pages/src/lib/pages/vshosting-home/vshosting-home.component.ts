/* eslint-disable @angular-eslint/component-selector */
import {
  ColumnDefinition,
  FilterDefinition,
  Todo,
  VshostingTableComponent,
} from "@vshosting-todo/shared";
import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  Signal,
  TemplateRef,
  ViewChild,
  inject,
} from "@angular/core";
import {
  getColumnDefinitions,
  getFilterDefinitions,
} from "./vshosting-home.models";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  selectAllTodos,
  selectCompletedTodosCount,
  selectUncompletedTodosCount,
} from "../../stores";
import { VshostingHomeFacade } from "./vshosting-home.facade";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "vshosting-home",
  templateUrl: "./vshosting-home.component.html",
  standalone: true,
  imports: [
    MatLabel,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    VshostingTableComponent,
  ],
  providers: [VshostingHomeFacade],
})
export class VshostingHomeComponent implements OnInit, AfterViewInit {
  @ViewChild("editTodoTemplate")
  editTodoTemplate!: TemplateRef<any>;

  private readonly store = inject(Store);
  private readonly cd = inject(ChangeDetectorRef);

  readonly facade = inject(VshostingHomeFacade);

  todos$: Observable<Todo[]> = this.store.select(selectAllTodos);
  completedTodosCount$: Observable<number> = this.store.select(
    selectCompletedTodosCount
  );
  uncompletedTodosCount$: Observable<number> = this.store.select(
    selectUncompletedTodosCount
  );

  columnDefinitions!: ColumnDefinition<Todo>[];
  filterDefinitions!: FilterDefinition<Todo>[];

  get isFormInvalid(): boolean {
    return this.facade.formGroup.invalid && this.facade.formGroup.touched;
  }

  ngOnInit(): void {
    this.facade.init();
    this.initDefs();
  }

  ngAfterViewInit(): void {
    this.facade.initTemplate(this.editTodoTemplate);
    this.cd.detectChanges();
  }

  createTodo(): void {
    this.facade.createTodo();
  }

  private initDefs() {
    this.columnDefinitions = getColumnDefinitions({
      onEdit: (row: Todo) => this.facade.editTodo(row),
      onDelete: (row: Todo) => this.facade.deleteTodo(row),
      markAllAsCompleted: () => this.facade.markAllAsCompleted(),
    });
    this.filterDefinitions = getFilterDefinitions();
  }
}
