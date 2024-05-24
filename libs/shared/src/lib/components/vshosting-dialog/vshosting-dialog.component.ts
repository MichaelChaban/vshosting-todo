import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { VshostingDialogData } from "./vshosting-dialog.models";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "vshosting-dialog",
  templateUrl: "./vshosting-dialog.component.html",
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class VshostingDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VshostingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VshostingDialogData
  ) {}

  onClose(result: boolean): void {
    if (result && this.data.onConfirm) {
      this.data.onConfirm();
    } else if (!result && this.data.onCancel) {
      this.data.onCancel();
    }
    this.dialogRef.close(result);
  }
}
