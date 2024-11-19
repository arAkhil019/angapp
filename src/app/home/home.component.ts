import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ShowComponent } from './show/show.component';
import { PanelModule} from 'primeng/panel'
import { DividerModule } from 'primeng/divider';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormComponent, ShowComponent, RouterOutlet, PanelModule, DividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
