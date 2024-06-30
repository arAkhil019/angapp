import { Component, OnInit, NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Role, Employee } from '../../models/common.model';
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, InputTextModule, FloatLabelModule, FormsModule, InputNumberModule, InputGroupModule, InputGroupAddonModule, DropdownModule, ButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})


export class FormComponent implements OnInit {
  roles: Role[] | undefined;
  selectedRole: string = '';

  Aadhar: number = 0;
  Contact: string = '';
  ID: string = '';
  Name: string = '';
  Pan: string = '';
  Proof: string = '';
  Salaray: number = 0;
  Type: string = '';

  employee: Employee[] = [];
  empObj: Employee = {
    Aadhar: 0,
    Contact: '',
    ID: '',
    Name: '',
    Pan: '',
    Proof: '',
    Salaray: 0,
    Type: ''
  };

  constructor( private db: EmployeeService ) { }

  ngOnInit() {
    this.roles = [
      'Full Time','Contractor','Intern'
      ];
    };
  
  addEmployee(){
    this.empObj.Name = this.Name;
    this.empObj.Salaray = this.Salaray;
    this.empObj.Type = this.Type;
    console.log(this.Type);
    this.empObj.ID = this.ID;
    this.empObj.Contact = this.Contact;
    this.empObj.Aadhar = this.Aadhar;

    // this.db.addEmployee(this.empObj);
    alert(this.selectedRole + ' ' + this.empObj.Name + ' ' + this.empObj.Salaray + ' ' + this.empObj.ID + ' ' + this.empObj.Contact + ' ' + this.empObj.Aadhar);
  }
}

