import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideEventPlugins(),
    // With Zone.js
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Without Zone.js
    // provideExperimentalZonelessChangeDetection(),
  ],
};
