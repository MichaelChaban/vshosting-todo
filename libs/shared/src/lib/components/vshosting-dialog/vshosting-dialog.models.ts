import { on } from "@ngrx/store";
import { TemplateRef } from "@angular/core";

export interface VshostingDialogData {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  template?: TemplateRef<any>;
  onConfirm?(): void;
  onCancel?(): void;
}
