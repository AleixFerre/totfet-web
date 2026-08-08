import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MessageService } from '@openng/optimus-ui/api';
import { provideOptimus } from '@openng/optimus-ui/config';
import Aura from '@openng/optimus-ui-themes/aura';
import { routes } from './app.routes';
import { authInterceptor } from './auth/auth.interceptor';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withXhr(), withInterceptors([authInterceptor])),
    provideOptimus({
      // Stock Aura, unmodified: emerald primary, zinc surfaces, outlined
      // inputs. To rebrand, wrap this in definePreset(Aura, { semantic: {
      // primary: {...} } }) rather than overriding colours in component SCSS.
      theme: {
        preset: Aura,
        options: {
          // The app is dark-only, so the class is hardcoded on <html> rather
          // than following prefers-color-scheme.
          darkModeSelector: '.app-dark',
          // Keeps Optimus styles in a lower cascade layer so component .scss
          // can override them without ::ng-deep specificity fights.
          cssLayer: { name: 'optimus', order: 'optimus, app-styles' },
        },
      },
    }),
    // App-wide: authInterceptor is a functional interceptor with no host
    // component to provide it locally.
    MessageService,
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
],
};
