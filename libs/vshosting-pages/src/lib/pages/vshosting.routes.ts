import { Route } from '@angular/router';
import { VshostingRoute } from '@vshosting-todo/shared';
import { VshostingHomeComponent } from './vshosting-home';
export const routes: Route[] = [
  {
    path: VshostingRoute.HOME,
    component: VshostingHomeComponent
  }
]
