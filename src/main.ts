import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import en from '@angular/common/locales/en';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { AppComponent } from './app/app.component';
import { APP_ROUTE } from './app/app.route';
import { AddHeaderInterceptor } from './app/core/interceptors/add-header.interceptor';
import { environment } from './environments/environment';

registerLocaleData(en);

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    },
    { provide: 'BASE_API_URL', useValue: environment.baseURL },
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(APP_ROUTE),
    { provide: NZ_I18N, useValue: en_US },
  ],
}).catch(console.error);
