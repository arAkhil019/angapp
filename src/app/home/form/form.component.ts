import { Component, OnInit, NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Role {
  name: string;
  code: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, InputTextModule, FloatLabelModule, FormsModule, InputNumberModule, InputGroupModule, InputGroupAddonModule, DropdownModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnInit {
  username: string = '';
  salaray: number = 0;
  roles: Role[] | undefined;

  selectedRole: Role | undefined;

  ngOnInit() {
    this.roles = [
      { name: 'Full Time', code: 'FT' },
      { name: 'Contractor', code: 'CT' },
      { name: 'Intern', code: 'IT' }
      ];
    };
}

