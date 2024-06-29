import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
  ]
};

// const app = initializeApp(environment.firebaseConfig);
// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
