import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app-routing.module';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
      provideAnimationsAsync(),
      providePrimeNG({
          theme: {
              preset: Aura
          }
      }),
      provideHttpClient(withFetch()),
      provideRouter(routes)
  ]
};
