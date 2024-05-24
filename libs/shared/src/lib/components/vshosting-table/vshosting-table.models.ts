/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateRef } from "@angular/core";

export interface ColumnDefinition<T, _KEY = keyof T> {
  id: string;
  value?: ((row?: T) => string | undefined) | string;
  headerName?: string;
  icon?: string;
  sortable?: boolean;
  routerLink?: ((row?: T) => string) | string;
  columnClass?: string;
  columnActions?: ColumnActionDefinition[];
  template?: TemplateRef<any>;
  isCheckbox?: boolean;
}

export interface ColumnActionDefinition {
  title?: string;
  icon?: string;
  tooltip?: string;
  color: "primary" | "accent" | "warn";
  className?: string;
  rounded?: boolean;
  disabled?: ((row?: any) => boolean) | boolean;
  onClick?: (row: any) => any;
  routerLink?: string;
  queryParams?: { [key: string]: any };
}
