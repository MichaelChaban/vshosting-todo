import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: "",
    loadChildren: () =>
      import("@vshosting-todo/vshosting-pages").then((m) => m.routes),
  },
  {
    path: "**",
    redirectTo: "",
  },
];
