import { MatCheckboxModule } from "@angular/material/checkbox";
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { ColumnDefinition } from "./vshosting-table.models";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "vshosting-table",
  templateUrl: "./vshosting-table.component.html",
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
  ],
})
export class VshostingTableComponent<T> implements OnInit, OnChanges {
  @Input()
  dataSource: T[] = [];

  @Input()
  columnDefinitions: ColumnDefinition<T>[] = [];

  displayedColumns: string[] = [];
  matTableDataSource = new MatTableDataSource<T>();
  selection = new SelectionModel<T>(true, []);

  ngOnInit(): void {
    this.updateColumns();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dataSource"]) {
      this.matTableDataSource.data = this.dataSource;
    }
    if (changes["columnDefinitions"]) {
      this.updateColumns();
    }
  }

  updateColumns(): void {
    this.displayedColumns = this.columnDefinitions?.map((col) => col.id);
    this.displayedColumns?.unshift("select");
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.matTableDataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.matTableDataSource.data.forEach((row) =>
          this.selection.select(row)
        );
  }

  getRowValue(row: T, column: ColumnDefinition<T>): string {
    if (column.value) {
      if (typeof column.value === "string") {
        return (row as any)[column.value] || "";
      }
      return column.value(row) || "";
    }
    return "";
  }
}
