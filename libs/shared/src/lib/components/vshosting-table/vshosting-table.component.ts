import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { Component, OnInit, input, computed, effect } from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ColumnDefinition, FilterDefinition } from "./vshosting-table.models";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { debounceTime } from "rxjs";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "vshosting-table",
  templateUrl: "./vshosting-table.component.html",
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
})
export class VshostingTableComponent<T> implements OnInit {
  constructor() {
    effect(() => (this.matTableDataSource.data = this.dataSource() || []));
  }

  readonly dataSource = input.required<T[]>();
  readonly columnDefinitions = input.required<ColumnDefinition<T>[]>();
  readonly displayedColumns = computed(() =>
    this.columnDefinitions()?.map((col) => col.id)
  );
  readonly filterDefinitions = input<FilterDefinition<T>[]>([]);

  matTableDataSource = new MatTableDataSource<T>();
  filterForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.createFilterForm();
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

  resetFilters(): void {
    this.filterForm.reset();
    this.applyFilters({});
  }

  private createFilterForm(): void {
    const group: any = {};
    this.filterDefinitions()?.forEach((filter) => {
      group[filter.id] = new FormControl(filter.value || "");
    });
    this.filterForm = new FormGroup(group);
    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe((filters) => {
        this.applyFilters(filters);
      });
  }

  private applyFilters(filters: any): void {
    this.matTableDataSource.filterPredicate = (data: T, filter: string) => {
      const filterValues = JSON.parse(filter);
      return Object.keys(filterValues).every((key) => {
        const filterValue = filterValues[key];
        if (!filterValue) {
          return true;
        }
        const dataValue = (data as any)[key];
        return dataValue
          .toString()
          .toLowerCase()
          .includes(filterValue.toString().toLowerCase());
      });
    };
    this.matTableDataSource.filter = JSON.stringify(filters);
  }
}
