import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { provideStore, StoreModule } from "@ngrx/store";
import { reducers, effects } from "@vshosting-todo/vshosting-pages";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideStore(),
    importProvidersFrom(
      BrowserAnimationsModule,
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot(effects),
      StoreDevtoolsModule.instrument()
    ),
  ],
};
