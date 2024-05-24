import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { CustomInterceptor } from './Service/custom.interceptor';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([CustomInterceptor])),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNoopAnimations()
]
};
