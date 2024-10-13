import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ShowComponent } from './show/show.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormComponent, ShowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
