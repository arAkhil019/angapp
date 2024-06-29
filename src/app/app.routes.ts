import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './home/form/form.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'add', component: FormComponent}
];
