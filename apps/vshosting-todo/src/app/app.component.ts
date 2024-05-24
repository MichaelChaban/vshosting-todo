import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { VshostingLoaderComponent } from "@vshosting-todo/shared";

@Component({
  standalone: true,
  imports: [RouterModule, VshostingLoaderComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {}
