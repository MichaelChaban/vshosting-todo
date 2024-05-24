import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class VshostingSnackbarService {
  private readonly snackbar = inject(MatSnackBar);

  open(message: string, action = "Close", duration = 2000) {
    this.snackbar.open(message, action, {
      duration,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }

  error(message: string, action = "Close", duration = 4000) {
    this.snackbar.open(message, action, {
      duration,
      panelClass: ["vshosting-snackbar-error"],
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }

  success(message: string, action = "Close", duration = 4000) {
    this.snackbar.open(message, action, {
      duration,
      panelClass: ["vshosting-snackbar-success"],
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}
