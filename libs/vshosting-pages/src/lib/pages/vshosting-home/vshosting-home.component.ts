/* eslint-disable @angular-eslint/component-selector */
import {
  ColumnDefinition,
  Todo,
  VshostingTableComponent,
} from "@vshosting-todo/shared";
import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from "@angular/core";
import { getColumnDefinitions } from "./vshosting-home.models";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectAllTodos } from "../../stores";
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

  todos$!: Observable<Todo[]>;

  columnDefinitions!: ColumnDefinition<Todo>[];

  get isFormInvalid(): boolean {
    return this.facade.formGroup.invalid && this.facade.formGroup.touched;
  }

  ngOnInit(): void {
    this.facade.init();
    this.todos$ = this.store.select(selectAllTodos);
    this.columnDefinitions = getColumnDefinitions({
      onEdit: (row: Todo) => this.facade.editTodo(row),
      onDelete: (row: Todo) => this.facade.deleteTodo(row),
    });
  }

  ngAfterViewInit(): void {
    this.facade.initTemplate(this.editTodoTemplate);
    this.cd.detectChanges();
  }

  createTodo(): void {
    this.facade.createTodo();
  }
}
