import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "vshosting-loader",
  templateUrl: "./vshosting-loader.component.html",
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class VshostingLoaderComponent {}
