import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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
