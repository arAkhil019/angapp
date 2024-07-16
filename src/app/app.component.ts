import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations()]
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ HttpClientModule]
})
export class AppComponent {
  title = 'angapp';
  heading = 'Welcome to Angular App';
  // constructor() {
  //   setTimeout(() => {
  //     this.heading = 'Welcome to New Changed Angular App';
  //   }, 2000);
  // }
}
