import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// import { appConfig } from './app/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations()]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


